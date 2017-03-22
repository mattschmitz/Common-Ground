var getMaximumDist = function (coords) {
  var matrix = [];
  for (var i = 0 ; i<coords.length; i++) {
    for (var j = 0; j<coords.length; j++) { 
      matrix.push(Math.sqrt(Math.pow((coords[i][0] - coords[j][0]), 2) +
                         Math.pow((coords[i][1] - coords[j][1]), 2)));
    }
  }
  return Math.ceil(max(matrix));
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

/* Pulled formatPlural() and secondsToString() from https://gist.github.com/JoshOldenburg/5485454 */

var formatPlural = function(val, singular, plural) {
  if (val == 1) return val + singular;
  return val + plural;
}

var secondsToString = function(seconds) {
  var time = Math.round(seconds / 60);

  if (time >= (60 * 24)) {
    var days = Math.floor(time / (24 * 60));
    var remaining = Math.floor(time % (24 * 60));
    return formatPlural(days, ' day', ' days') + ', ' + minutesToString(remaining);
  } else if (time >= 60) {
    var hours = Math.floor(time / 60);
    var minutes = time % 60;
    return formatPlural(hours, ' hr', ' hrs') + ', ' + minutesToString(minutes);
  } else {
    return formatPlural(time, ' min', ' min');
  }
};

module.exports.getMaximumDist = getMaximumDist;
module.exports.findCentroid = findCentroid;
module.exports.secondsToString = secondsToString;