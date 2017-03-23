angular.module('etapartments')
.directive('queryBar', function() {
  return {
    scope: {
      getresults: '<'
    },
    controllerAs: 'query',
    bindToController: true,
    controller: 'QueryBar',
		templateUrl: 'client/htmlTemplates/querybar.html'
  }
})

.controller('QueryBar', function (){
  
});