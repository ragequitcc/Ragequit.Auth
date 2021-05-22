FROM node:14

WORKDIR /usr/src/auth

COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src
COPY .env ./

RUN npm install

RUN npm run build

COPY ./dist .

EXPOSE 8080

CMD ["node", "app.js"]
