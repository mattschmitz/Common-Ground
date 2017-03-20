angular.module('etapartments')
.service('search', function($http, $window) {
  this.query = function(callback) {
    $http.get('http://127.0.0.1:8080/search')
      .then(function(data) {
        if (callback) {
          callback(data.data.businesses);
        }
      });
  };
});