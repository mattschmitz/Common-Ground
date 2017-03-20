var keys = require('../config/API_KEYS');
var _ = require('underscore');

var googleMapsClient = require('@google/maps').createClient({
  key: keys.G_DIRECTIONS_KEY
});

/* Returns an array with each row corresponding to an origin and each col corresponding to a destination
each element in the array is an object representing the travel time between origin and destination. 
Example:
  params: { origins: '944 Market St, San Francisco, CA 94102',
            destinations: '25 Pearl St, San Francisco, CA 94103|565 Grove St, San Francisco, CA 94102', 
            mode: 'driving' }
  results: [{"text":"10 mins","value":612},{"text":"9 mins","value":536}] */
exports.getTravelTime = function(params, cb){
  googleMapsClient.distanceMatrix(params, function(err, response) {
    if (!err) {
      var matrix = response.json.rows[0].elements 
      var travel_times = _.map(matrix, function(el){
         return el.duration;
      });
      cb(travel_times);
    }
  });
}

/* Gets latitude and longitude of an address:
Example: 
  params: {address: '944 Market St, San Francisco, CA 94102'}
  results: {"lat":37.7836966,"lng":-122.4089664} */
exports.geocode = function(params, cb){
  googleMapsClient.geocode(params, function(err, response) {
    if (!err) {
      var results = response.json.results[0].geometry.location
      cb(results);
    }
  });
}

//currently not used
exports.getDirections = function(params, cb){
  googleMapsClient.directions(params, function(err, response) {
    if (!err) {
      cb(response.json.routes[0].legs[0].duration); //returns just duration object.
    }
  });
}

/*
Documentation on google maps client and apis: 
  https://googlemaps.github.io/google-maps-services-js/docs/GoogleMapsClient.html
  https://developers.google.com/maps/documentation/

  "For applications that use the Directions API or Distance Matrix API in highly 
  latency-sensitive situations, such as responding to user input, we recommended 
  you use Place Autocomplete to get the place IDs corresponding to those addresses,
  and pass the place IDs to the Directions API or Distance Matrix API"
*/