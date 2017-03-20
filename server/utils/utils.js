var getMaximumDist = function (coords) {
  var matrix = [];
  for (var i = 0 ; i<coords.length; i++) {
    for (var j = 0; j<coords.length; j++) { 
      matrix.push(Math.sqrt(Math.pow((coords[i][0] - coords[j][0]), 2) +
                         Math.pow((coords[i][1] - coords[j][1]), 2)));
    }
  }
  return Math.ceiling(max(matrix));
}

var max = function(array) {
  return array.reduce(function(prev, curr) {
    return curr > prev ? curr : prev;
  });
}

var findCentroid = function(coords){
  var numCords = coords.length;

  var sumLats = 0, sumLongs = 0;
  for (var i = 0; i < numCords; i++) {
    sumLats += coords[i][0];
    sumLongs += coords[i][1];
  } 

  var avgLat = sumLats/numCords;
  var avgLong = sumLongs/numCords;

  return [avgLat, avgLong];
};

module.exports.getMaximumDist = getMaximumDist;
module.exports.findCentroid = findCentroid;