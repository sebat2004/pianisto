FROM node:18.16.0-alpine3.17

RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app

COPY --chown=app:node ./microservices/yt-downloader/package*.json ./
RUN npm install
COPY --chown=app:node ./microservices/yt-downloader .
EXPOSE 8082

CMD [ "npm", "run", "start"]