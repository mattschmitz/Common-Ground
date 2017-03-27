angular.module('etapartments')
.directive('queryBar', function() {
  return {
    scope: {
      getresults: '<',
      filterresults: '<'
    },
    controllerAs: 'query',
    bindToController: true,
    controller: 'QueryBar',
		templateUrl: 'client/htmlTemplates/querybar.html'
  }
})

.controller('QueryBar', function (){
  
});