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