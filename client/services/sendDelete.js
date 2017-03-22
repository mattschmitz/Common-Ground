angular.module('etapartments')
.service('sendDelete', function($http, $window) {
  this.sendDeletedAnchor = function(params, callback) {
    $http.post('http://127.0.0.1:8080/deleteanchor', params)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(err) {
      console.log(err, 'login data!')
    	callback(err, null);
    })
  };
});