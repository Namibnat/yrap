FROM python:buster

WORKDIR /app

COPY ./requirements.txt .

RUN apt update -y && \
    pip install --update pip && \
    pip install -r requirements.txt

COPY . .

