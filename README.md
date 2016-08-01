Overview

This is a web application for keeping track of local social events. For example, a town organization might hold events on a monthly basis. In the app, members of the organization can add past events to record the date, time, venue, and number of attendees for the event.

Technology Stack

Data store: MongoDB
API routing: Express
Server: Node.js
JavaScript bundling: Webpack
Front end: React, jQuery, Bootstrap


Setup instructions

1.	Clone the repository: git clone https://github.com/emodeen/nrdsc.git
2.  In a new terminal window, start MongoDB: mongod
3.	In a new terminal window, cd to the directory where the project was cloned to.
4.  Bundle the JavaScript files: webpack ./app/js/main.js ./app/js/bundle.js --module-bind 'js=babel-loader'
5.	Install Node modules and start the http server: npm start
6.	In a web browser, browse to localhost: http://localhost:3000