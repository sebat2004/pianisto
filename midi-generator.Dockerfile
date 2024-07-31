FROM python:3.10

WORKDIR /app

COPY ./microservices/midi-generator/requirements.txt /app/requirements.txt
COPY ./microservices/midi-generator/files /app/files
COPY ./microservices/midi-generator/model /app/model

RUN apt-get -y update && apt-get -y upgrade && apt-get -y install libsndfile1
RUN apt -y update && apt install ffmpeg
RUN ffmpeg -h
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./microservices/midi-generator/api /app/api

CMD ["fastapi", "run", "api/main.py", "--port", "8080", "--reload"]