angular.module('etapartments')

.directive('anchorBar', function () {
	return {
		restrict: 'E',
		scope: {},	
		templateUrl: 'client/htmlTemplates/anchorBar.html'
	}
})