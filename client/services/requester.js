angular.module('etapartments')
.service('yelp', function($http, $window) {
  this.search = function(callback) {
    $http.get('http://127.0.0.1:8080/yelp')
      .then(function(data) {
          console.log(data.data.businesses);
        if (callback) {
          callback(data.data.businesses);
        }
      });
  };
});