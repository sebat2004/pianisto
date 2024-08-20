from typing import Annotated
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import os

from model.transcriptions import generateTranscription
from .db import getDbPool

@asynccontextmanager
async def lifespan(a):
   pool = await getDbPool()
   yield {"pool": pool}
   await pool.close()
 
app = FastAPI(lifespan=lifespan)

@app.post("/transcriptions")
async def createTranscription(file: UploadFile = File(...)):
    fileName = file.filename.split('.')[0]
    audioPath = os.path.join(os.path.dirname(__file__), '../files/inputs/', file.filename)
    with open(audioPath, 'wb') as f:
        f.write(file.file.read())

    outputPath = os.path.join(os.path.dirname(__file__), '../files/outputs/')

    generateTranscription(audioPath, outputPath, fileName)

    return FileResponse(path=outputPath+fileName+'.mid', media_type='audio/midi')


