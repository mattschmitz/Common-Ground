angular.module('etapartments')
.directive('anchorsList', function() {
  return {
    scope: {
      anchors: '<',
      delete: '<'
    },
    controllerAs: 'anchorsList',
    bindToController: true,
    controller: 'anchorCtrl',
    templateUrl: 'client/htmlTemplates/anchorslist.html'
  }
})

.controller('anchorCtrl', function($scope) {

});