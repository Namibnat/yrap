FROM python:18-bullseye

RUN apt update -y && apt install python-3.10.2

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    DJANGO_SETTINGS_MODULE=web.settings \
    PORT=8000 \
    WEB_CONCURRENCY=3

COPY ./requirements.txt /app/requirements.txt

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app

CMD ["sh", "entrypoint.sh"]
