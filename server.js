var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var db = require('./config/db');
var app = express();


var COMMENTS_FILE = path.join(__dirname, 'comments.json');

//mongoose.connect(db.url);

//var conn = mongoose.connection;
var RESTAURANTS_COLLECTION = "restaurants";

var restaurantSchema = mongoose.Schema({
  name: { type: String, trim: true },
  city: { type: String, trim: true }
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

//conn.on('error', console.error.bind(console, 'connection error:'));

//conn.once('open', function() {
//  console.log('connected!!');
//});

app.use('/', express.static(path.join(__dirname, 'public')));
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

// endpoint to retrieve all restaurants
app.get('/restaurants', function (req, res) {
  Restaurant.find(function (err, restaurants) {
    if (err) return console.error(err);
    res.send(restaurants);
  });    
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});


//routes.addAPIRouter(app, mongoose);