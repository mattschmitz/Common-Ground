//Finds centroid of a set of coordinates

//input: array of tuples containing latitudess and longitutes
//output: tuple representing [lat, long] of centroid

//example: findCentroid([[0,0],[0,2],[2,2],[2,0]]) //=> [1,1]

var findCentroid = function([coords]){
  var numCords = coords.length();

  var sumX = 0;
  var sumY = 0;

  for var(i = 0; i < numCords; i++) {
    sumX += coords[i][0];
    sumY += coords[0][i];
  } 

  var avgX = sumX/numCords;
  var avgY = sumY/numCords;

  return [avgX, avgY];
}
