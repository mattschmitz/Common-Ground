angular.module('etapartments')
.service('auth', function($http, $window) {
  this.logIn = function(params, callback) {
    $http.post('http://127.0.0.1:8080/login', params)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(err) {
    	callback(err, null);
    })
  };

  this.logOut = function(params, callback) {
    $http.get('http://127.0.0.1:8080/logout')
  };

  this.signUp = function(params, callback) {
    $http.post('http://127.0.0.1:8080/signup', params)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(err) {
      callback(err, null);
    })
  };
});