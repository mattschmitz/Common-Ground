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

/* 
Pulled formatPlural() secondsToString() from https://gist.github.com/JoshOldenburg/5485454
secondsToString() was modified to fit our needs
 */

var formatPlural = function(val, singular, plural) {
  if (val == 1) return val + singular;
  return val + plural;
}

var secondsToString = function(seconds) {

  if (seconds >= (86400)) {
    var days = Math.floor(seconds / 86400);
    var remaining = seconds % 86400;
    return remaining > 0 ? formatPlural(days, ' day', ' days') + ', ' + secondsToString(remaining) : formatPlural(days, ' day', ' days');
  } else if (seconds >= 3600) {
    var hours = Math.floor(seconds / 3600);
    var remaining = seconds % 3600;
    return remaining > 0 ? formatPlural(hours, ' hr', ' hrs') + ', ' + secondsToString(remaining) : formatPlural(hours, ' hr', ' hrs');
  } else if (seconds >= 60) {
    var minutes = Math.floor(seconds / 60);
    var remaining = seconds % 60;
    return remaining > 0 ? formatPlural(minutes, ' min', ' min') + ', ' + secondsToString(remaining) : formatPlural(minutes, ' min', ' min');
  } else {
    return formatPlural(seconds, ' sec', ' sec');
  }
};

module.exports.getMaximumDist = getMaximumDist;
module.exports.findCentroid = findCentroid;
module.exports.secondsToString = secondsToString;