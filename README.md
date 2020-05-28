Tuzzy is a lightweight, cloud native developer portal being created that takes an opinionated approach to serving API documentation. 


### Building on what's good
Tuzzy uses the incredibly popular specification standard OpenAPI 3 as a bedrock for serving API documentation. This makes it trivial to plug it in and start serving your existing Swagger specs!

You can inject an existing spec directly into Tuzzy, or let Tuzzy take care of it for you if your spec is available remotely. Tuzzy will make sure the specification is kept up to date, versioned, and available to all users.

Multiple specs can be linked, and APIs can be consolidated through a centralised, easy to use interface.    

### Development
1. Install java
```
$ brew install openjdk
```
2. Install maven 
```
$ brew install maven
```
3. Install node
```
$ brew install node
```
4. Get backend dependencies. From `/server` directory:
```
$ mvn clean install
```
5. Get frontend dependencies. From `/client` directory:
```
$ yarn install  
```
6. Run StartPostgresDocker.kt to throw up a postgres instance for local development 
7. Run backend through editor or through cli with
```
$ mvn clean package 
$ java -jar target/app.jar
```
8. Run app (from client directory):
```
$ npm start
``` 


