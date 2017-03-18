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
})