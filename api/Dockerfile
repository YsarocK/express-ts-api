FROM node:18

# Create app directory
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000