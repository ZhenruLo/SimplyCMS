FROM python:3.11

WORKDIR /headless_cms

ENV IN_DOCKER Yes

COPY .build/requirements.txt /headless_cms/.build/requirements.txt
RUN pip install -r /headless_cms/.build/requirements.txt

COPY . /headless_cms
EXPOSE 5000

