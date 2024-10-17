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
s3_bucket = CloudBucket(
    name="audio",
    mount_path=mount_path,
    config=CloudBucketConfig(
        access_key="ACCESS_KEY",
        secret_key="SECRET_KEY",
        endpoint="https://pianisto-transcriptions.s3.us-west-2.amazonaws.com/"
    ),
)
@function(
    name="generate-transcription",
    cpu=3,
    memory="16Gi",
    gpu="T4",
    volumes=[s3_bucket],
    image=Image(
        python_version="python3.10",
        python_packages=[
            "torch",
            "numpy",
            "librosa==0.9.2",
        ],
    )
)
def _getMidiEvents(fileName):
    print(os.listdir("../audio"))
    print(os.listdir("./checkpoint"))
    # Transcriptor
    inputFilePath = f'../audio/{fileName}'
    (audio, _) = load_audio(inputFilePath, sr=sample_rate, mono=True)

    checkpoint_path = os.path.join(os.path.dirname(__file__), '../checkpoint/CRNN_note_F1=0.9677_pedal_F1=0.9186.pth')
    transcriptor = PianoTranscription(device='cuda', checkpoint_path=checkpoint_path)
    est_note_events, est_pedal_events, _ = transcriptor.getMidiEvents(audio)
    return est_note_events, est_pedal_events