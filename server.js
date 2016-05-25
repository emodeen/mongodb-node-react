var mongoose = require('mongoose');
var express = require('express');
var db	 = require('./config/db');

var app = express();

mongoose.connect(db.url);

var conn = mongoose.connection;
var RESTAURANTS_COLLECTION = "restaurants";

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  console.log('connected!!');
  var restaurantSchema = mongoose.Schema({
    name: { type: String, trim: true },
    city: { type: String, trim: true }
  });

  var Restaurant = mongoose.model('Restaurant', restaurantSchema);

  Restaurant.find(function (err, restaurants) {
    if (err) return console.error(err);
    console.log(restaurants);
  });  
});


// endpoint to retrieve all restaurants
app.get('/restaurants', function (req, res) {
  db.collection(RESTAURANTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get restaurants.");
    } else {
      res.status(200).json(docs);
    }
  });

  res.send('Hello World!');
  res.send('mongo collection');
  res.contentType('application/json');
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});


//routes.addAPIRouter(app, mongoose);