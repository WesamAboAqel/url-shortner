FROM node:25.2.1-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run db:migrate

CMD ["npm", "run", "dev"]
