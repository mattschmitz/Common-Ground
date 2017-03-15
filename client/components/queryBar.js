angular.module('etapartments')

.directive('queryBar', function() {
	return {
		restrict: 'E',
		scope: {},	
		templateUrl: 'client/htmlTemplates/queryBar.html'
	};
});