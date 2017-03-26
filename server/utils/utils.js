var getMaximumDist = function (coords) {
  var matrix = [];
  for (var i = 0 ; i<coords.length; i++) {
    for (var j = 1; j<coords.length; j++) { 
      matrix.push(haversine(coords[i][0], coords[i][1], coords[j][0], coords[j][1]));
    }
  }
  var maxDist = max(matrix) * 500;
  return Math.floor(maxDist);
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

/* 
Haversine formula implementation from https://rosettacode.org/wiki/Haversine_formula#JavaScript
Takes in 4 arguments, (latitude1, longitude1, latitude2, longitude2) and returns km
*/

var haversine = function() {
       var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
       var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
       var R = 6372.8; // km
       var dLat = lat2 - lat1;
       var dLon = lon2 - lon1;
       var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
       var c = 2 * Math.asin(Math.sqrt(a));
       return R * c;
}

module.exports.getMaximumDist = getMaximumDist;
module.exports.findCentroid = findCentroid;
module.exports.secondsToString = secondsToString;
module.exports.max = max;