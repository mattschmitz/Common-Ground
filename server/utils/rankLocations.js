/*

INPUT: array of yelp bizes, array of anchors

  get travel times for each anchor to each busines - store in array
    calls to distance matrix api

  for each business: 
    -get average travel time for each biz
    -get std for each biz
    -generate rank for each biz
    -create object 'travelTimes' with the above, add this object to array of yelp bizes

OUTPUT: array of yelp bizes

*/

var _ = require('underscore');
var gHelpers = require('./gHelpers')

module.exports = function(yelpData, anchors, cb) {

  var bizes = JSON.parse(yelpData).businesses

  // console.log(bizes[0].coordinates);
  //build strings that can be passed into matrix Call
      // {
      //     origins: '37.783617,-122.408955', 
      //     destinations: '37.770841,-122.423786|37.777179,-122.425929',
      //     mode: 'driving'
      //   }

  //take averages, std, and rank - add to help data

  //sort by rank

  cb(yelpData);
};
