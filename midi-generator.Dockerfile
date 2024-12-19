FROM python:3.10

WORKDIR /app

COPY ./services/midi-generator/requirements.model.txt /app/requirements.model.txt
COPY ./services/midi-generator/requirements.txt /app/requirements.txt
COPY ./services/midi-generator/files /app/files
COPY ./services/midi-generator/model /app/model

RUN apt-get -y update && apt-get -y upgrade && apt-get -y install libsndfile1
RUN apt -y update && apt install ffmpeg -y
RUN ffmpeg -h
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
RUN pip install -v git+https://github.com/sebat2004/piano_transcription_inference.git#egg=piano-transcription-inference

COPY ./services/midi-generator/api /app/api

CMD ["fastapi", "run", "api/main.py", "--port", "8080", "--reload"]