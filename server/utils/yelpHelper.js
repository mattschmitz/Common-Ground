var request = require('request');
var utils = require('./utils.js');
var _ = require('underscore');

var radius = 1000;
var centroid = [37.7836966, -122.4089664];
var anchors = [];
var coordinates = [];

var setSearchArea = function(anchors, callback) {
  // anchors is an array of anchor objects
  // anchor.coordinates has an object with properties lat and lng: {lat: 37.7836966, lng: -122.4089664}
  if (anchors.length === 1) {
    centroid = anchors[0].coordinates;
  } else {
    var coordinates = [];
    for (var i = 0; i < anchors.length; i++) {
      coordinates.push([anchors[i].coordinates.lat, anchors[i].coordinates.lng]);
    }
    centroid = utils.findCentroid(coordinates);
    // utils.getMaximumDist returns a radius
    // We want to limit the max radius to 40000m, but also have a min of 1000m
    // Math.min takes the smaller of the calc radius or 40000
    // Math.max takes the larger of the calc radius or 1000
    radius = Math.max(Math.min(utils.getMaximumDist(coordinates), 40000), 1000);
  }
  if (callback) {
    anchors[anchors.length - 1].centroid = {lat: centroid[0], lng: centroid[1]};
    callback(anchors);
  }
}

var getBusinesses = function(params, callback) {

//params[radius] = radius

var options = { 
  method: 'GET',
  url: 'https://api.yelp.com/v3/businesses/search',
  qs: _.extend(params, {latitude: centroid[0], longitude: centroid[1], radius: radius}), //extend paramaters with radius and centroid
  headers: 
   { 'postman-token': '5073d720-9247-c291-f3cf-3701c76aca74',
     'cache-control': 'no-cache',
     authorization: process.env.YELP_API_KEY
    } 
  };

request(options, function (error, response, body) {
  if (error) throw error;

  callback(body);
});

}

module.exports.getBusinesses = getBusinesses;
module.exports.setSearchArea = setSearchArea;