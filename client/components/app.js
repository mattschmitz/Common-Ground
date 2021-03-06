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

.controller('AppCtrl', function($scope, $window, $timeout, search, auth, $q) {
  this.list = [];
  this.anchors = [];
  this.center = {};
  this.filteredList = [];
  this.anchorMsg = 'Set Your Starting Point';

  $scope.$watch('app.anchors', function() {
    if (this.anchors.length > 0) {
      this.anchorMsg = 'Add Another Starting Point';
    } else {
      this.anchorMsg = 'Set Your Starting Point';
    }
  }.bind(this));

  this.getYelpResults = function(term, price, rating, open, travel_time) {
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
        this.filteredList = this.filterResults(this.list, travel_time, rating);
    }.bind(this));
  }.bind(this);

  this.filterResults = function(originalList, travel_time, rating) {
    // Ensure we don't mutate original array
    var oldResults = originalList.slice();
    var newResults = [];

    if (travel_time === undefined && rating === undefined) {
      return oldResults;
    } else {
      for (var i = 0; i < oldResults.length; i++) {
        if (travel_time !== undefined && oldResults[i].travelTimes.max > (travel_time * 60)) {
          continue;
        } else if (rating !== undefined && rating > oldResults[i].rating) {
          continue;
        } else {
          newResults.push(oldResults[i]);
        }
      }
      return newResults;
    }
  }

  this.filterChange = function(travel_time, rating) {
    this.filteredList = this.filterResults(this.list, travel_time, rating);
  }.bind(this);

  this.sendAnchor = function(name, address, city, state, zip, mode) {
    var anchor = {
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      travel_mode: mode
    }
    anchor.fullAddress = anchor.address + ', ' + anchor.city + ', ' + anchor.state + ' ' + anchor.zip;
    anchor.splitAddress = [anchor.address, anchor.city + ', ' + anchor.state + ' ' + anchor.zip];
    var anchors = this.anchors.slice();
    anchors.push(anchor);
    search.sendAnchor(anchors, function(data) {
      this.anchors = data.data;
      // Should recenter map based on centroid of last anchor object
      // Should display all anchors
    }.bind(this))
  }.bind(this);

  this.deleteAnchor = function(index) {
    this.anchors.splice(index,1);
  }.bind(this);

  this.logInUser = function(user, callback) {
    $q(function(resolve, reject){
      auth.logIn(user, function(error, results) {
        if(error){
          reject(error)
        } else {
          resolve(results)
        }
      })
    }).then(function(results) {
      this.anchors = results.data;
      callback()
    }.bind(this))
  }.bind(this)

  $scope.$on('showResult', function(event, index) {
    // Waits for an emit from resultsEntry with the index
    // Then sends out a broadcast down to the map with the index
    $scope.$broadcast('showResultOnMap', index);
  })
})