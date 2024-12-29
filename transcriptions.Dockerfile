FROM public.ecr.aws/lambda/python:3.10

# Switch to root to manipulate /opt
USER root

RUN mkdir -p /opt/bin
COPY services/transcriptions/ffmpeg.zip /opt/bin/ffmpeg.zip

RUN yum install libsndfile -y

RUN yum install -y unzip && \
    cd /opt/bin && \
    unzip ffmpeg.zip && \
    mv ffmpeglib/ffmpeg . && \
    rm -rf ffmpeglib && \
    rm ffmpeg.zip && \
    chmod +x ffmpeg

# Install Git
RUN yum install -y git && \
    yum clean all

WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./services/transcriptions/requirements.model.txt ./requirements.model.txt
COPY ./services/transcriptions/requirements.txt ./requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

# Copy necessary files
COPY ./services/transcriptions/lib ${LAMBDA_TASK_ROOT}/lib
COPY ./services/transcriptions/api ${LAMBDA_TASK_ROOT}/api

CMD [ "api.main.handler" ]