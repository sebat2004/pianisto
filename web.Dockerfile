FROM node:20.10.0-alpine3.17

WORKDIR /app
COPY ./web ./
RUN npm ci


CMD ["npm", "run", "dev"]
