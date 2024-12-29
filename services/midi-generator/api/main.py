import os
import asyncio
import json
import requests

from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.responses import FileResponse
from mangum import Mangum


@asynccontextmanager
async def lifespan(a):
    pool = await getDbPool()
    yield {"pool": pool, "count": 1}  # passes pool into request.state
    await pool.close()


app = FastAPI(lifespan=lifespan)
handler = Mangum(app, lifespan="auto", api_gateway_base_path="/v1/transcription")


@app.get("/")
def read_root():
    return {"Welcome to": "My first FastAPI deployment using Docker image"}


@app.post("/transcriptions/")
def transcribe(request: Request, file: UploadFile = File(...)):
    try:
        # Put midi-gen task in queue
        url = os.environ.get("TRANSCRIPTIONS_API_URL")
        payload = {"fileName": file.filename}
        headers = {
            "Authorization": f"Bearer ${os.environ.get('TRANSCRIPTIONS_API_TOKEN')}",
            "Content-Type": "application/json",
        }
        response = requests.post(url, data=json.dumps(payload))

        # Get taskId from response
        data = response.json()
        taskId = data["taskId"]

        return {"message": "Transcription started", "taskId": taskId}
    except:
        return {"message": "Transcription failed"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
