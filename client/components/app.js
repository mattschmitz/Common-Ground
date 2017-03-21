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
    // Create object
    var params = {
      anchors: [],
      yelp: {
        term: arguments[0],
        price: arguments[1],
        rating: arguments[2],
        open_now: arguments[3]
      },
      google: {
        travel_mode: arguments[4],
        travel_time: arguments[5]
      }
    }

    search.query(params, function(data) {
        this.list = data.businesses;
        this.center = data.centroid;
    }.bind(this));
  }.bind(this);
})