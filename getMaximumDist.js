//finds a suitable radius given a set of coordinates
//coords should be an array of coordinates of the form: (latitude, longitude)


//getMaximumDist([[0,0],[1,0], [1,1]]) => 1.4142
//getMaximumDist([[-1,0],[0,0], [1,0], [2,0]]) => 3

var getMaximumDist = function (coords) {
  var matrix = [];
  for (var i = 0 ; i<coords.length; i++) {
    for (var j = 0; j<coords.length; j++) { 
      matrix.push(Math.sqrt(Math.pow((coords[i][0] - coords[j][0]), 2) +
                         Math.pow((coords[i][1] - coords[j][1]), 2)));
    }
  }
  return max(matrix);
}

var max = function(array) {
  return array.reduce(function(prev, curr) {
    return curr > prev ? curr : prev;
  });
}

///
