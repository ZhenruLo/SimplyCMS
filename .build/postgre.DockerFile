FROM postgres:latest

ENV POSTGRES_PASSWORD=root
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=database

EXPOSE 5432