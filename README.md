Setup instructions

1.	Clone the repository: git clone https://github.com/emodeen/nrdsc.git
2.  cd to gs-rest-service/initial
3.  run the maven build: mvn clean package
4.  Start the REST server: java -jar target/gs-rest-service-0.1.0.jar
5.  In a new terminal window, start MongoDB: mongod
6.	In a new terminal window, go to the directory where the project was cloned to.
7.	Install dependencies and start the http server: npm start
8.	In a web browser, browse to localhost using the port specified at the end of the startup script: e.g. http://localhost:8000/app/
