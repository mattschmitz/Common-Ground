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
  this.anchors = [];
  this.center = {};

  this.getYelpResults = function(term, price, rating, open, travel_mode, travel_time) {
    // Create object
    var params = {
      anchors: this.anchors,
      yelpParams: {
        term: term,
        price: price,
        rating: rating,
        open_now: open
      },
      travelParams: {
        travel_time: travel_time
      }
    }
    search.query(params, function(data) {
        this.list = data.businesses;
        this.center = data.centroid;
    }.bind(this));
  }.bind(this);

  this.sendAnchor = function(name, address, city, state, zip, mode) {
    var params = {
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      travel_mode: mode
    }
    search.sendAnchor(params, function(data) {
      this.anchors.push(data.data);
      // Should recenter map based on centroid of last anchor object
      // Should display all anchors
    }.bind(this))
  }.bind(this);

  this.deleteAnchor = function(index) {
    this.anchors.splice(index,1);
  }.bind(this);
})