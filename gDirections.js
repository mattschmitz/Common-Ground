var keys = require('./config/API_KEYS');
var _ = require('underscore');

var googleMapsClient = require('@google/maps').createClient({
  key: keys.G_DIRECTIONS_KEY
});


exports.getDirections = function(params, cb){
  googleMapsClient.directions(params, function(err, response) {
    if (!err) {
      cb(response.json.routes[0].legs[0].duration); //returns just duration object.
    }
  });
}

//returns an array with each row corresponding to an origin and each col corresponding to a destination
//each element in the array is an object representing the travel time. 
//FOR EXAMPLE: for a single origin and two destinations, return value will be: 
//[{"text":"10 mins","value":612},{"text":"9 mins","value":536}]
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