angular.module('etapartments')
.service('auth', function($http, $window) {
  this.logIn = function(params, callback) {
    $http.post('http://127.0.0.1:8080/login', params);
  };
  this.signUp = function(params, callback) {
    $http.post('http://127.0.0.1:8080/signup', params);
  };
});