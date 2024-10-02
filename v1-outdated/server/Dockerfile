FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./.env

EXPOSE $PORT

RUN npm run build

CMD [ "npm", "run", "start:dev" ]