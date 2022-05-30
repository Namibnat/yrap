FROM node:18-bullseye

RUN apt update -y

WORKDIR /app

ENV PORT=8000

COPY . /app

CMD ["sh", "entrypoint.sh"]
