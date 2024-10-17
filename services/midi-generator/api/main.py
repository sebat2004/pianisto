import os
import asyncio
from google.protobuf.json_format import MessageToDict
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.responses import FileResponse
from note_seq.midi_io import midi_file_to_note_sequence
from piano_transcription_inference.utilities import write_events_to_midi

from model.transcriptions import getMidiEvents
from .db import getDbPool

@asynccontextmanager
async def lifespan(a):
   pool = await getDbPool()
   yield { 
            "pool": pool,
            "count": 1
        } # passes pool into request.state
   await pool.close()
 
app = FastAPI(lifespan=lifespan)

@app.post("/transcriptions")
async def createTranscription(request: Request, file: UploadFile = File(...)):
    print(file.filename)
    if file.size > 20000000: # 20mb 
        raise HTTPException(400, "File size too large")

    # Get filename without extension
    fileName = list(file.filename)
    idx = len(fileName) - 1
    while fileName[idx] != ".":
        fileName.pop()
        idx -= 1
    fileName.pop() # remove last .
    fileName = "".join(fileName)

    # Generate transcription
    outputFolderPath = os.path.join(os.path.dirname(__file__), '../files/outputs/')
    est_note_events, est_pedal_events = await getMidiEvents(file)

    # Write MIDI events to file
    midiFilePath = outputFolderPath+fileName+'.mid'
    write_events_to_midi(start_time=0, note_events=est_note_events, 
        pedal_events=est_pedal_events, midi_path=midiFilePath)
    print('Write out to {}'.format(midiFilePath))

    noteSequenceProto = midi_file_to_note_sequence(midiFilePath)
    noteSequence = MessageToDict(noteSequenceProto)
    
    # Insert transcription and notes into DB
    async with request.state.pool.connection() as conn:
        async with conn.cursor() as curs:
            insertTranscriptionSql = """
                                INSERT INTO transcriptions (qpm, song_name) VALUES (%s, %s) 
                                RETURNING transcription_id;
                                """
            insertNoteSql = """
                        INSERT INTO notes (transcription_id, start_time, end_time, pitch, velocity)
                        VALUES (%s, %s, %s, %s, %s);
                        """
            qpm = noteSequence["tempos"][0]["qpm"]
        
            await curs.execute(insertTranscriptionSql, (qpm, fileName))
            res = await curs.fetchone()
            transcriptionId = res[0]
            for note in noteSequence["notes"]:
                await conn.execute(insertNoteSql, (transcriptionId, note["startTime"]*1000,
                                                    note["endTime"]*1000, note["pitch"], note["velocity"]))

    return FileResponse(path=midiFilePath, media_type='audio/midi')


