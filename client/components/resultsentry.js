angular.module('etapartments')
.directive('resultsEntry', function() {
  return {
    scope: {
      result: '<',
      rindex: '<'
    },
    controllerAs: 'resultsEntry',
    bindToController: true,
    controller: 'EntryCtrl',
    templateUrl: 'client/htmlTemplates/resultsentry.html'
  }
})

.controller('EntryCtrl', function($scope, $window) {
  this.showResult = function(index) {
    // On <li> click, it receives the index of the entry
    // Then emits a signal back up to the app w/ the index
    $scope.$emit('showResult', index);
  }
});