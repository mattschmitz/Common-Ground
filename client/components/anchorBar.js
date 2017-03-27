angular.module('etapartments')
.directive('anchorBar', function($timeout) {
  return {
    link: function(scope, element, attrs, controller) {
        var nameOptions = {
          types: ['establishment'],
        };
        var addressOptions = {
          types: ["address"]
        };
        var nameForm = element[0].children[0][0];
        var addressForm = element[0].children[0][1];
        
        $timeout(function() {
          controller.initAutocomplete(nameOptions, addressOptions, nameForm, addressForm);
        }, 1000);
        },
    scope: {
      sendanchor: '<'
    },
    controllerAs: 'anchor',
    bindToController: true,
    controller: 'AnchorBar',
    templateUrl: 'client/htmlTemplates/anchorBar.html'
  } 
})

.controller('AnchorBar', function($scope, $window) {
  this.sendandclear = function() {
    $scope.anchor.sendanchor($scope.anchor.name, $scope.anchor.address, $scope.anchor.city, $scope.anchor.state, $scope.anchor.zip, $scope.anchor.travel_mode);
    $scope.anchor.name = '';
    $scope.anchor.address = '';
    $scope.anchor.city = '';
    $scope.anchor.state = '';
    $scope.anchor.zip = '';
    $scope.anchor.travel_mode = 'driving';
    $scope.anchor.query = '';
  };

  this.autocompleteName;
  this.autocompleteAddress;

  this.initAutocomplete = function(nameOptions, addressOptions, nameElement, addressElement) {
    this.autocompleteName = new $window.google.maps.places.Autocomplete(nameElement, nameOptions);
    this.addListener(this.autocompleteName);
    this.autocompleteAddress = new $window.google.maps.places.Autocomplete(addressElement, addressOptions);
    this.addListener(this.autocompleteAddress);
  }.bind(this);

  this.addListener = function(element) {
    $window.google.maps.event.addListener(element, 'place_changed', function() {
        $scope.$apply(function() {
          $scope.anchor.fillInAddress(element);
        });
    });
  }.bind(this);

  this.fillInAddress = function(element) {
    var place = element.getPlace();
    
    this.name = place.name;
    this.address = place.address_components[0].long_name + ' ' + place.address_components[1].long_name;
    this.city = place.address_components[3].long_name;
    this.state = place.address_components[5].short_name;
    this.zip = parseInt(place.address_components[7].long_name);

  }.bind(this);
});