angular.module('etapartments')
.directive('anchorEntry', function() {
  return {
    scope: {
      anchor: '<',
      aindex: '<',
      delete: '<'
    },
    controllerAs: 'anchorEntry',
    bindToController: true,
    controller: 'AnchorEntryCtrl',
    templateUrl: 'client/htmlTemplates/anchorentry.html'
  }
})

.controller('AnchorEntryCtrl', function(sendDelete, $q) {
  this.onDeleteClick = function (params) {
    return $q(function(resolve, reject) {
      sendDelete.sendDeletedAnchor(params, function(err, results) {
        if(err){
          reject(error)
        } else {
          resolve(results)
        }
      })
    }).then(this.delete(this.aindex))
  }
});