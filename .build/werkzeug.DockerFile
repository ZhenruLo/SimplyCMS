FROM python:3.11

WORKDIR /headless_cms

ENV IN_DOCKER Yes

COPY .build/requirements.txt /headless_cms/.build/requirements.txt
RUN pip install -r /headless_cms/.build/requirements.txt && pip install 'celery[redis]'==5.3.1 && pip install gunicorn==21.2.0
RUN apt-get update && apt-get upgrade && apt-get install -y gcc libpq-dev && apt-get install redis-server postgresql postgresql-contrib

COPY . /headless_cms
EXPOSE 5000

