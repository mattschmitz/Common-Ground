angular.module('etapartments')
.directive('resultsList', function() {
  return {
    scope: {
      results: '<'
    },
    controllerAs: 'resultsList',
    bindToController: true,
    controller: 'listCtrl',
    templateUrl: 'client/htmlTemplates/resultslist.html'
  }
})

.controller('listCtrl', function($scope) {

});