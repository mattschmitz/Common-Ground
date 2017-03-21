var _ = require('underscore');
var gHelpers = require('./gHelpers')


module.exports = function(yelpData, anchors, travelParams, cb) {
// INPUT: array of yelp bizes, array of anchors

  var bizes = JSON.parse(yelpData).businesses
  // console.log(bizes[0].coordinates)


//   get travel times for each anchor to each busines - store in array
//     calls to distance matrix api
  // var originCoordinates = '';
  //get origins

  var anchorCoords = _.map(anchors, function(anchor){
    return (anchor.coordinates.lat + ',' + anchor.coordinates.lng);
  })

  var bizCoordinatesString = _.map(bizes, function(biz){
    return (biz.coordinates.latitude + ',' + biz.coordinates.longitude);
  }).join('|')
  
  var matrix = [];
  var resultsCount = 0;

  _.each(anchorCoords, function(anchorCoordPair, index) {
    var params = {
      origins: anchorCoordPair,
      destinations: bizCoordinatesString,
      mode: travelParams.travel_mode
    };

    gHelpers.getTravelTimes(params, function(results){
      matrix[index] = results;
      resultsCount++;

      //once all the results have come in
      if (resultsCount === anchorCoords.length){
        console.log(matrix);
        cb(yelpData);

      //   //   for each business: 
      //   //     -get average travel time for each biz
      //   //     -get std for each biz
      //   //     -generate rank for each biz
      //   //     -create object 'travelTimes' with the above, add this object to array of yelp bizes
      //   _.each(bizes, function(biz, index) {
      //     travelTimes = {};
      //     travelTimes.avg = average(matrix,i)

      //   });

      }
    })
  })






};
