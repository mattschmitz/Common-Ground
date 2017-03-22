angular.module('etapartments')
.directive('anchorBar', function() {
  return {
    scope: {
      sendanchor: '<'
    },
    controllerAs: 'anchor',
    bindToController: true,
    controller: 'AnchorBar',
		templateUrl: 'client/htmlTemplates/anchorBar.html'
  } 
})

.controller('AnchorBar', function($scope) {
  this.sendandclear = function() {
    $scope.anchor.sendanchor($scope.anchor.name, $scope.anchor.address, $scope.anchor.city, $scope.anchor.state, $scope.anchor.zip, $scope.anchor.travel_mode);
    $scope.anchor.name = '';
    $scope.anchor.address = '';
    $scope.anchor.city = '';
    $scope.anchor.state = '';
    $scope.anchor.zip = '';
    $scope.anchor.travel_mode = 'driving';
  }
});