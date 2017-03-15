var map;
// Starting coords
var start = {lng: -122.41, lat: 37.78};
// Zoom level (lower is zoomed out, higher is zoomed in)
// 0 = whole world, 21 = single street (min is set to 12, max is set to 19)
// Default zoom is currently 13
var minZoom = 12;
var maxZoom = 19;
var zoom = 13;

// For ref: points should an array of tuples in [longitude, latitude]
// Longitude bounds: -180 to 180
// Latitude bounds: -85 to 85
// Sample data
var points = [ {lng: -122.398, lat: 37.784, title: 'Address 1'}, {lng: -122.413, lat: 37.787, title: 'Address 2'}, {lng: -122.405, lat: 37.755, title: 'Address 3'}, {lng: -122.4, lat: 37.785} ];

var initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: start,
    minZoom: minZoom,
    maxZoom: maxZoom,
    zoom: zoom
  });

addPoints(points);
}

// addPoints takes an array of objects
// Each object should have a lat, lng, and an optional title property
var addPoints = function(array) {
  // Loop through each 
  for (var i = 0; i < array.length; i++) {
    if (array[i].title) {
      new google.maps.Marker({
        position: {lat: array[i].lat, lng: array[i].lng},
        map: map,
        title: array[i].title
      });
    } else {
      new google.maps.Marker({
        position: {lat: array[i].lat, lng: array[i].lng},
        map: map
      });
    }
  }
}