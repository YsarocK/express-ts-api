FROM node:18-alpine

WORKDIR /root

COPY package.json .

RUN npm install

COPY . .

ENV PATH ./node_modules/.bin/:$PATH