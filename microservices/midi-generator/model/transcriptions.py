from piano_transcription_inference import PianoTranscription, sample_rate, load_audio
import tkinter as tk
from tkinter import filedialog
import os

def generateTranscription(filepath, outputPath, fileName):

  # Load audio
  (audio, _) = load_audio(filepath, sr=sample_rate, mono=True)

  # Transcriptor
  checkpoint_path = os.path.join(os.path.dirname(__file__), 'CRNN_note_F1=0.9677_pedal_F1=0.9186.pth')
  transcriptor = PianoTranscription(device='cpu', checkpoint_path=checkpoint_path)

  # Transcribe and write out to MIDI file
  transcribed_dict = transcriptor.transcribe(audio, outputPath+fileName+'.mid')
  return transcribed_dict