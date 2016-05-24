var mongoose = require('mongoose');
var express = require('express');
var db	 = require('./config/db');

var app = express();

mongoose.connect(db.url);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  console.log('connected!!');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
  res.contentType('application/json');
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});


//routes.addAPIRouter(app, mongoose);