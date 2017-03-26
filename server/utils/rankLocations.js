var _ = require('underscore');
var math = require('mathjs');
var gHelpers = require('./gHelpers');
var util = require('./utils.js');

var getRank = function(std, avg) {
  return math.round(avg + (.4 * std))
}

module.exports = function(yelpData, anchors, travelParams, cb) {
  var yData = JSON.parse(yelpData);
  var bizes = yData.businesses
  // console.log(bizes[0].coordinates)

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
      mode: anchors[index].travel_mode
    };
    gHelpers.getTravelTimes(params, function(results){
      matrix[index] = results;
      resultsCount++;

      //once all the results have come in
      if (resultsCount === anchorCoords.length){

        //TODO: refactor so that this isn't necessary
        var timesMatrix = math.transpose(matrix); 
        
        _.each(bizes, function(biz, i) {
          var times = timesMatrix[i];
          var max = util.max(times);
          var avg = math.round(math.mean(times));
          var std = math.round(math.std(times, 'uncorrected'));
          var rank = math.round(getRank(avg, std));
          var display = util.secondsToString(avg);

          biz.travelTimes = {times: times, max: max, avg: avg, std: std, rank: rank, display: display};
          // console.log(biz.travelTimes);
        });

        //TODO: refactor to use in place sort
        var sortedBizes = math.sort(bizes, function(bizA, bizB){
          return bizA.travelTimes.rank - bizB.travelTimes.rank;
        });

        yData.businesses = sortedBizes;

        cb(JSON.stringify(yData));

      }
    });
  });

};
