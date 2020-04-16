FROM openjdk:12-alpine

WORKDIR /app

## Backend
ADD lib /app/lib
ADD app.jar /app/app.jar

## Frontend + toggle serve from app/public
ADD webapp /app/public
ENV PROD_MODE=true

## Run
CMD java -jar app.jar
