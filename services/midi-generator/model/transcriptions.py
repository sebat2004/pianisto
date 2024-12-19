from piano_transcription_inference import PianoTranscription, sample_rate, load_audio
from beam import Image, function, Volume, CloudBucket, CloudBucketConfig
import os
import boto3


async def getMidiEvents(file):
    # Write sent audio file to S3
    s3 = boto3.resource('s3')
    BUCKET = "pianisto-transcriptions"
    s3.Bucket(BUCKET).put_object(Key=file.filename, Body=await file.read())

    # Transcribe and write out to MIDI file
    est_note_events, est_pedal_events = _getMidiEvents.remote(file.filename)

    return est_note_events, est_pedal_events

mount_path = "./audio"
s3Bucket = CloudBucket(
    name="pianisto-transcriptions",
    mount_path=mount_path,
    config=CloudBucketConfig(
        access_key="ACCESS_KEY",
        secret_key="SECRET_KEY",
        region="us-west-2"
    ),
)

checkpointVolume = Volume(name="checkpoint", mount_path="./checkpoint")
@function(
    name="generate-transcription",
    cpu=1,
    memory="16Gi",
    gpu="T4",
    volumes=[s3Bucket, checkpointVolume],
    image=Image(
        python_version="python3.10",
        python_packages="requirements.model.txt"
    )
    .add_commands(["apt update -y", "apt install ffmpeg -y"])
)
def _getMidiEvents(fileName):
    # Transcriptor
    inputFilePath = os.path.join(s3Bucket.mount_path, fileName)

    (audio, _) = load_audio(inputFilePath, sr=sample_rate, mono=True)

    checkpoint_path = os.path.join(os.path.dirname(__file__), '../checkpoint/CRNN_note_F1=0.9677_pedal_F1=0.9186.pth')
    transcriptor = PianoTranscription(device='cuda', checkpoint_path=checkpoint_path)
    est_note_events, est_pedal_events, _ = transcriptor.getMidiEvents(audio)
    return est_note_events, est_pedal_events