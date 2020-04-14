FROM openjdk:12-alpine

WORKDIR /app

## Backend
ADD /home/vsts/work/1/lib /app/lib
ADD /home/vsts/work/1/app.jar /app/app.jar

## Frontend
ADD /home/vsts/work/1/webapp /app/public

## Run
CMD java -jar app.jar

