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

.controller('AppCtrl', function($scope, $window) {
  this.list = [{
      "name": "Deli Board",
      "review_count": 1003,
      "phone": "+14155527687",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/wA6jJVj5-by8NzVCCuBlmQ/o.jpg",
      "price": "$$",
      "location": {
        "address2": "",
        "address1": "1058 Folsom St",
        "country": "US",
        "city": "San Francisco",
        "address3": "",
        "state": "CA",
        "zip_code": "94103",
        "display_address": [
          "1058 Folsom St",
          "San Francisco, CA 94103"
        ]
      },
      "display_phone": "(415) 552-7687",
      "id": "deli-board-san-francisco",
      "rating": 4.5,
      "url": "https://www.yelp.com/biz/deli-board-san-francisco?adjust_creative=ElAQK5tbY7GkmoJHMqhDtQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ElAQK5tbY7GkmoJHMqhDtQ",
      "transactions": [],
      "is_closed": false,
      "categories": [
        {
          "title": "Delis",
          "alias": "delis"
        },
        {
          "title": "Sandwiches",
          "alias": "sandwiches"
        }
      ],
      "distance": 753.7628260378,
      "coordinates": {
        "latitude": 37.7776799,
        "longitude": -122.40709
      }
    }];
})