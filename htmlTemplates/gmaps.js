var map;
// Starting coords
var start = {lng: -122.41, lat: 37.78};
// Zoom level (lower is zoomed out, higher is zoomed in)
// 0 = whole world, 21 = single street (min is set to 12, max is set to 19)
// Default zoom is currently 13
var minZoom = 12;
var maxZoom = 19;
var zoom = 13;
var lastWindow;

// For ref: points should an array of tuples in [longitude, latitude]
// Longitude bounds: -180 to 180
// Latitude bounds: -85 to 85
// Sample data
var points = [ {lng: -122.398, lat: 37.784, title: 'Justin'}, {lng: -122.413, lat: 37.787, title: 'Jong'}, {lng: -122.405, lat: 37.755, title: 'Matt'}, {lng: -122.4, lat: 37.785, title: 'Tyler'} ];

var initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: start,
    minZoom: minZoom,
    maxZoom: maxZoom,
    zoom: zoom
  });

addPoints(map, points);
}

// addPoints takes an array of objects
// Each object is anticipated to be in the format that Yelp's API returns objects in

var addPoints = function (map, locations){
  var marker, i
  // Loop through all locations
  for (i = 0; i < locations.length; i++) {  
    // Create a new marker object
    var marker = new google.maps.Marker({
      // marker.map sets which map to set marker on
      // marker.position takes an object with lat, lng properties  
      map: map, position: {lat: locations[i].lat, lng: locations[i].lng} 
    });
    // content is the HTML we want to render inside the infowindow
    var content = '<h1>' + locations[i].title + '</h1>'

    // Create InfoWindow object   
    var infowindow = new google.maps.InfoWindow();

    // Add an event listener to listen for a click on a marker
    // Uses closure to retain access to individual content
    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
      return function() {
      // Close the previous infowindow
      closeInfos();
      // Set the contents of infowindow to our HTML content
      infowindow.setContent(content);
      // Display the infowindow for clicked marker
      infowindow.open(map,marker);
      // Keep the marker to close it on next click event
      lastWindow = infowindow;
      };
    })(marker, content, infowindow));
  }
}

var closeInfos = function (){
   if(lastWindow){
      // Detach the infowindow from the marker
      lastWindow.set("marker", null);
      // Close the marker
      lastWindow.close();
      // Reset infos
      lastWindow = null;
   }
}