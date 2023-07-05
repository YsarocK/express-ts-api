FROM node:18

# Create app directory
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

# Bundle app source
COPY . .

<<<<<<< Updated upstream
EXPOSE 3000
CMD [ "npm", "run", "start" ]
=======
EXPOSE 3000
>>>>>>> Stashed changes
