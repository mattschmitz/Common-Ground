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
var single = [{
      "name": "Deli Board",
      "review_count": 1003,
      "phone": "+14155527687",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/wA6jJVj5-by8NzVCCuBlmQ/o.jpg",
      "price": "$$",
      "location": {
        "address2": "",
        "address1": "1058 Folsom St",
        "country": "US",
        "city": "San Francisco",
        "address3": "",
        "state": "CA",
        "zip_code": "94103",
        "display_address": [
          "1058 Folsom St",
          "San Francisco, CA 94103"
        ]
      },
      "display_phone": "(415) 552-7687",
      "id": "deli-board-san-francisco",
      "rating": 4.5,
      "url": "https://www.yelp.com/biz/deli-board-san-francisco?adjust_creative=ElAQK5tbY7GkmoJHMqhDtQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ElAQK5tbY7GkmoJHMqhDtQ",
      "transactions": [],
      "is_closed": false,
      "categories": [
        {
          "title": "Delis",
          "alias": "delis"
        },
        {
          "title": "Sandwiches",
          "alias": "sandwiches"
        }
      ],
      "distance": 753.7628260378,
      "coordinates": {
        "latitude": 37.7776799,
        "longitude": -122.40709
      }
    }];


var initMap = function () {
  map = new google.maps.Map(document.getElementById('mapWindow'), {
    center: start,
    minZoom: minZoom,
    maxZoom: maxZoom,
    zoom: zoom
  });

addPoints(map, single);
}

// addPoints takes an array of objects
// Each object should have a lat, lng, and an optional title property

var addPoints = function (map, locations){
  var marker, i
  // Loop through all locations
  for (i = 0; i < locations.length; i++) {  
    // Create a new marker object
    var marker = new google.maps.Marker({
      // marker.map sets which map to set marker on
      // marker.position takes an object with lat, lng properties  
      map: map, position: {lat: locations[i].coordinates.latitude, lng: locations[i].coordinates.longitude} 
    });
    // content is the HTML we want to render inside the infowindow
    console.log(locations[i]);
    var content = '<div class="infoWindow"><p><a class="infoWindowLink" href="' + locations[i].url + '" target="_blank"><h2>' + locations[i].name + '</h2></a></p><img class="infoWindowImg" src="' + locations[i].image_url + '"><div class="infoWindowBlock"><span class="infoWindowLabel">Address:</span> ' + locations[i].location.display_address[0] + '<br>' + locations[i].location.display_address[1] + '</div><br><div class="infoWindowBlock"><span class="infoWindowLabel">Phone:</span> ' + locations[i].display_phone + '</div></div>'

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