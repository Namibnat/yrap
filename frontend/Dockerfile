FROM node:buster

WORKDIR /app

RUN apt update -y

COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start"]