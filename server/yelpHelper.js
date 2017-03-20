var request = require('request');
var keys = require('../config/API_KEYS');
var utils = require('../utils/utils.js');
var _ = require('underscore');

var radius = 1000;
var centroid = [37.7836966, -122.4089664];
var anchors = [];
var coordinates = [];

var setSearchArea = function(anchor, coords) {
  
  anchors.push(anchor);
  coordinates.push([coords.lat, coords.lng]);
  console.log(anchors, coordinates);
  if (anchors.length === 1) {
    centroid = [coords.lat, coords.long];
  } else {
    centroid = utils.findCentroid(coordinates);
    radius = 2*utils.getMaximumDist(coordinates);
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
     authorization: keys.YELP_KEY
    } 
  };

request(options, function (error, response, body) {
  if (error) throw error;

  callback(body);
});

}

module.exports.getBusinesses = getBusinesses;
module.exports.setSearchArea = setSearchArea;
//export setAnchor
//export setRadius