FROM node:14-alpine

#RUN apk update && apk add python make gcc

WORKDIR /usr/src/auth

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/app.js"]
