var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var db = require('./config/db');
var app = express();


var COMMENTS_FILE = path.join(__dirname, 'comments.json');

mongoose.connect('mongodb://localhost/test');

var db_conn = mongoose.connection;
db_conn.on('error', console.error.bind(console, 'connection error:'));
db_conn.once('open', function() {
  console.log('connected!!');
});

var EVENTS_COLLECTION = "events";

var eventSchema = mongoose.Schema({
  name: { type: String, trim: true },
  city: { type: String, trim: true }
});

var Event = mongoose.model('Restaurant', eventSchema);

app.set('port', (process.env.PORT || 3000));

app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// endpoint to retrieve all events
app.get('/events', function (req, res) {
  Event.find(function (err, events) {
    if (err) return console.error(err);
    res.send(events);
  });    
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});


//routes.addAPIRouter(app, mongoose);