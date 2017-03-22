angular.module('etapartments')
.directive('anchorEntry', function() {
  return {
    scope: {
      anchor: '<',
      aindex: '=',
      delete: '<'
    },
    controllerAs: 'anchorEntry',
    bindToController: true,
    controller: 'AnchorEntryCtrl',
    templateUrl: 'client/htmlTemplates/anchorentry.html'
  }
})

.controller('AnchorEntryCtrl', function() {

});