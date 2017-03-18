angular.module('etapartments')
.directive('mapDisplay', function() {
  
  return {
    scope: {
      results: '<'
    },
    controllerAs: 'map',
    bindToController: true,
    controller: 'MapCtrl',
    templateUrl: 'client/htmlTemplates/map.html'
  }
})

.controller('MapCtrl', function($scope, $window) {

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

  var options = {
    start: {lng: -122.41, lat: 37.78},
    minZoom: 12,
    maxZoom: 19,
    zoom: 13
  }

  var lastWindow;

  $scope.map = new $window.google.maps.Map(document.getElementById('mapWindow'), {
    center: options.start,
    minZoom: options.minZoom,
    maxZoom: options.maxZoom,
    zoom: options.zoom
  })

  var addPoints = function (map, locations){
    var marker, i
    // Loop through all locations
    for (i = 0; i < locations.length; i++) {  
      // Create a new marker object
      var marker = new $window.google.maps.Marker({
        // marker.map sets which map to set marker on
        // marker.position takes an object with lat, lng properties  
        map: map, position: {lat: locations[i].coordinates.latitude, lng: locations[i].coordinates.longitude} 
      });
      // content is the HTML we want to render inside the infowindow
      console.log(locations[i]);
      var content = '<div class="infoWindow"><p><a class="infoWindowLink" href="' + locations[i].url + '" target="_blank"><h2>' + locations[i].name + '</h2></a></p><img class="infoWindowImg" src="' + locations[i].image_url + '"><div class="infoWindowBlock"><span class="infoWindowLabel">Address:</span> ' + locations[i].location.display_address[0] + '<br>' + locations[i].location.display_address[1] + '</div><br><div class="infoWindowBlock"><span class="infoWindowLabel">Phone:</span> ' + locations[i].display_phone + '</div></div>'

      // Create InfoWindow object   
      var infowindow = new $window.google.maps.InfoWindow();

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
  
  addPoints($scope.map, single);
})