FROM node:14 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . ./

RUN npm run build