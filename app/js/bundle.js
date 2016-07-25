/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//var webpack = require('webpack');
	//var React = require('react');
	//var ReactDOM = require('react-dom');

	document.write(__webpack_require__(1));

	var venues = [];
	var pastEvents = [];

	// constructor for NREvent objects
	function NREvent(venue, rating) {
	  this.venue = venue;
	  this.rating = rating;
	}

	// constructor for Venue objects
	function Venue(name, avgRating) {
	  this.name = name;
	  this.avgRating = avgRating;
	}

	// calculate the average rating for a venue, passing in the venue object
	function calcAvgRating(venue) {
		var avgRating = 0;

		// running total of the venue ratings
		var total = 0;

		// number of events at the venue
		var numEvents = 0;

		pastEvents = JSON.parse(localStorage["pEvents"]);

		// loop through each of the past events
		// Legal Seafood is only one coming in as a past event
		pastEvents.forEach(function(entry) {

			if (entry.venue === venue.name) {
				numEvents++;
				total += parseFloat(entry.rating);
			}
		});


		avgRating = (total/numEvents).toPrecision(2);

		return avgRating;
	}

	$(document).ready(function() {
		// Called when the Venues page is loaded. For each venue, create object to add to venues array.
		$( ".venueRow" ).each(function( index ) {
	      var name = $(this).find(".venueName").html();
	      var newVenue = new Venue(name);
	      
		  newVenue.avgRating = calcAvgRating(newVenue);

		  venues.push(newVenue);

		  // populate the avg rating cell
		  $(this).find(".avg").html(newVenue.avgRating);
		});

	    // populate the events array
	  	$("#past-form").on("submit", function(e){
		  e.preventDefault();

		  var newDate = $("#new-date").val();
		  var newTime = $("#new-time").val();
		  var newVenue = $("#new-venue").val();
		  var numAttendees = $("#new-num-attendees").val();
		  var newRating = $("#new-rating").val();
	      var newEvent = new NREvent(newVenue, newRating);

		  pastEvents.push(newEvent);

		  localStorage["pEvents"] = JSON.stringify(pastEvents);

		  // need to populate this JSON with the last entry in pastEvents array
		  var eventData = JSON.stringify({ date: newDate, time: newTime, venue: newVenue, attendees: numAttendees, rating: newRating });

	      $.ajax({
	        	type: "POST",
	        	url: "/events",
	        	data: eventData,
	        	contentType: "application/json",
	        	error: function (xhr, ajaxOptions, thrownError) {
	           		console.log(xhr.status);
	           		console.log(xhr.responseText);
	           		console.log(thrownError);
	       		}
	      });	    
	  	});  

	  	$('#idea-form').on("submit", function(e){
		  e.preventDefault();

		  var venue = $("#new-venue").val();
		  var location = $("#new-location").val();
		  var pros = $("#new-pros").val();
		  var cons = $("#new-cons").val();
		  var votes = $("#new-votes").val();

		  $("table").append('<tr class=\'data-row\'><td class=\'data\'>'+venue+'</td><td class=\'data\'>'+location+'</td><td class=\'data\'>'+pros+'</td><td class=\'data\'>'+cons+'</td><td class=\'data\'>'+votes+'</td></tr>');
		  $(".data-row").addClass('table-row');
		  $(".data").addClass('table-column');
	  	});  

	  	$('#venue-form').on("submit", function(e){
		  e.preventDefault();

		  var venue = $("#new-venue").val();
		  var location = $("#new-location").val();
		  
		  var avgRating = $("#new-avg-rating").val();

		  $("table").append('<tr class=\'data-row venueRow\'><td class=\'data venueName\'>'+venue+'</td><td class=\'data\'>'+location+'</td><td class=\'data avg\'>'+avgRating+'</td></tr>');
		  $(".data-row").addClass('table-row');
		  $(".data").addClass('table-column');
	  	});
	});


































/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "It works from content.js.";

/***/ }
/******/ ]);