var mongoose = require('mongoose');
var express = require('express');
var db	 = require('./config/db');

var app = express();

mongoose.connect(db.url);

var conn = mongoose.connection;
var RESTAURANTS_COLLECTION = "restaurants";

var restaurantSchema = mongoose.Schema({
  name: { type: String, trim: true },
  city: { type: String, trim: true }
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  console.log('connected!!');
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