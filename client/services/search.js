angular.module('etapartments')
.service('search', function($http, $window) {
  this.query = function(params, callback) {
    $http.post('http://127.0.0.1:8080/search', params)
      .then(function(data) {
        if (callback) {
          data.data.centroid = {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude};
          callback(data.data);
        }
      });
  };
});