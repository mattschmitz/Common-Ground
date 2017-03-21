angular.module('etapartments')
.directive('app', function() {
	return {
    scope: {},
    controllerAs: 'app',
    bindToController: true,
    controller: 'AppCtrl',
		templateUrl: 'client/htmlTemplates/app.html',
	}
})

.controller('AppCtrl', function($scope, $window, search) {
  this.list = [];
  this.center = {};
  this.getYelpResults = function() {
    console.log('This is our yelp list before button press:', this.list);
    search.query(function(data) {
        this.list = data.businesses;
        this.center = data.centroid;
        console.log('This is our yelp list after button press:', this.list);
    }.bind(this));
  }.bind(this);
})