angular.module('etapartments')

.controller('AppController', function() {
	// $scope.
})

.directive('app', function() {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'client/htmlTemplates/app.html'
	};
})