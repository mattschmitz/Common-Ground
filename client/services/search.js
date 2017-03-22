angular.module('etapartments')
.service('search', function($http, $window) {
  this.query = function(params, callback) {
    $http.post('/search', params)
      .then(function(data) {
        if (callback) {
          data.data.centroid = {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude};
          callback(data.data);
        }
      });
  };
  this.sendAnchor = function(params, callback) {
    $http.post('/anchor', params)
      .then(function(data) {
        if (callback) {
          callback(data);
        }
      })
  }
});