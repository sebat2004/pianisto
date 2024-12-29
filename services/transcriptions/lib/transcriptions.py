import os

from piano_transcription_inference import PianoTranscription, sample_rate, load_audio
from beam import Image, task_queue, Volume, CloudBucket, CloudBucketConfig, env
from dotenv import load_dotenv

load_dotenv()

if env.is_remote():
    from google.protobuf.json_format import MessageToDict
    from note_seq.midi_io import midi_file_to_note_sequence
    from piano_transcription_inference.utilities import write_events_to_midi
    from db import getDbConn


mount_path = "./audio"
s3Bucket = CloudBucket(
    name="pianisto-transcriptions",
    mount_path=mount_path,
    config=CloudBucketConfig(
        access_key="ACCESS_KEY", secret_key="SECRET_KEY", region="us-west-2"
    ),
)
checkpointVolume = Volume(name="checkpoint", mount_path="./checkpoint")

TRANSCRIPTIONS_DB_HOST = os.environ.get("TRANSCRIPTIONS_DB_HOST")
TRANSCRIPTIONS_DB_USER = os.environ.get("TRANSCRIPTIONS_DB_USER")
TRANSCRIPTIONS_DB_PASSWORD = os.environ.get("TRANSCRIPTIONS_DB_PASSWORD")
TRANSCRIPTIONS_DB_PORT = os.environ.get("TRANSCRIPTIONS_DB_PORT")


@task_queue(
    name="generate-transcription",
    cpu=3,
    memory="4Gi",
    gpu="T4",
    volumes=[s3Bucket, checkpointVolume],
    image=Image(
        python_version="python3.10",
        python_packages="requirements.model.txt",
        env_vars={
            "TRANSCRIPTIONS_DB_HOST": TRANSCRIPTIONS_DB_HOST,
            "TRANSCRIPTIONS_DB_USER": TRANSCRIPTIONS_DB_USER,
            "TRANSCRIPTIONS_DB_PASSWORD": TRANSCRIPTIONS_DB_PASSWORD,
            "TRANSCRIPTIONS_DB_PORT": TRANSCRIPTIONS_DB_PORT,
        },
    ).add_commands(["apt update -y", "apt install ffmpeg -y"]),
)
def getMidiEvents(fileName):
    # Transcriptor
    inputFilePath = os.path.join(s3Bucket.mount_path, fileName)
    checkpoint_path = "/mnt/code/checkpoint/CRNN_note_F1=0.9677_pedal_F1=0.9186.pth"

    (audio, _) = load_audio(inputFilePath, sr=sample_rate, mono=True)

    transcriptor = PianoTranscription(device="cuda", checkpoint_path=checkpoint_path)
    est_note_events, est_pedal_events, _ = transcriptor.getMidiEvents(audio)

    # Write MIDI events to file
    outputFolderPath = "/tmp/"
    midiFilePath = outputFolderPath + fileName + ".mid"
    write_events_to_midi(
        start_time=0,
        note_events=est_note_events,
        pedal_events=est_pedal_events,
        midi_path=midiFilePath,
    )

    noteSequenceProto = midi_file_to_note_sequence(midiFilePath)
    noteSequence = MessageToDict(noteSequenceProto)

    conn = getDbConn()

    # Insert transcription and notes into DB
    with conn.cursor() as curs:
        insertTranscriptionSql = """
                            INSERT INTO transcriptions (qpm, song_name) VALUES (%s, %s) 
                            RETURNING transcription_id;
                            """
        insertNoteSql = """
                    INSERT INTO notes (transcription_id, start_time, end_time, pitch, velocity)
                    VALUES (%s, %s, %s, %s, %s);
                    """
        qpm = noteSequence["tempos"][0]["qpm"]
        print(qpm)
        curs.execute(insertTranscriptionSql, (qpm, fileName))
        res = curs.fetchone()
        transcriptionId = res[0]
        print(transcriptionId)
        for i, note in enumerate(noteSequence["notes"]):
            curs.execute(
                insertNoteSql,
                (
                    transcriptionId,
                    note["startTime"] * 1000,
                    note["endTime"] * 1000,
                    note["pitch"],
                    note["velocity"],
                ),
            )
    conn.commit()
    conn.close()
    return est_note_events, est_pedal_events
