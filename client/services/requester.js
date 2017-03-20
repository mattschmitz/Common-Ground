angular.module('etapartments')
.service('search', function($http, $window) {
  this.query = function(callback) {
    $http.get('http://127.0.0.1:8080/search')
      .then(function(data) {
        if (callback) {
          console.log(data.data.region.center);
          var centroid = {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}
          data.data.centroid = centroid;
          callback(data.data);
        }
      });
  };
});