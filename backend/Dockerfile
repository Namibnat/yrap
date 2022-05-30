FROM python:3.10-bullseye

RUN apt update -y

WORKDIR /usr/src/app/

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/usr/src/app/ \
    DJANGO_SETTINGS_MODULE=web.settings \
    PORT=8000 \
    WEB_CONCURRENCY=3

COPY ./requirements.txt /usr/src/app//requirements.txt

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /usr/src/app/

CMD ["sh", "entrypoint.sh"]
