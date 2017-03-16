//Finds centroid of a set of coordinates

//input: array of tuples containing latitudess and longitutes
//output: tuple representing [lat, long] of centroid

//example: findCentroid([[0,0],[0,2],[2,2],[2,0]]) //=> [1,1]

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