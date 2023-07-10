FROM node:18-alpine

WORKDIR /root

COPY package.json .

RUN npm i

COPY . .

ENV PATH ./node_modules/.bin/:$PATH