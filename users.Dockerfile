FROM node:18.16.0-alpine3.17

RUN addgroup app && adduser -S -G app app
USER root
RUN apk --no-cache add curl
USER app
WORKDIR /app
COPY --chown=app:node ./services/users/package*.json ./
RUN npm install
COPY --chown=app:node ./services/users .
EXPOSE 8081

CMD [ "npm", "run", "start"]