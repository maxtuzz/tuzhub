FROM openjdk:12-alpine

WORKDIR /app

## Backend
ADD lib /app/lib
ADD app.jar /app/app.jar

## Frontend
ADD webapp /app/public

## Run
CMD java -jar app.jar

