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

});