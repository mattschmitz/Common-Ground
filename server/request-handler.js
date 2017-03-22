var yelp = require('./utils/yelpHelper');
var gHelpers = require('./utils/gHelpers');
var rankLocations = require('./utils/rankLocations');
var anchorsDb = require('./db/Models/anchors')
var Promise = require('bluebird')
//add body parser...

exports.getResults = function(req, res){
  // req.body should be of form:
  // { 
  //   anchors: [
  //     {
  //       name: 'Hack Reactor', 
  //       address: '944 Market St, San Francisco, CA 94102', 
  //       coordinates: {lat: '37.783617', lng: '-122.408955'}
  //     },
  //     {
  //       name: 'Home', 
  //       address: '33 Pearl St, San Francisco, CA 94103', 
  //       coordinates: {lat: '37.770841', lng: '-122.423786'}
  //     },
  //   ],
  //   yelpParams: { 
  //     term: 'bars', 
  //     price: '2', 
  //     rating: '2', 
  //     open_now: true 
  //   },
  //   travelParams: { 
  //     travel_mode: 'driving', 
  //     travel_time: 10 
  //   } 
  // }
  yelp.getBusinesses(req.body, function(yelpResults) {
    rankLocations(yelpResults, req.body.anchors, req.body.travelParams, function(rankedResults){
      res.send(rankedResults);
    });
  });
}

var anchors = [];

exports.addAnchor = function(req, res) {
  var anchor = req.body[req.body.length - 1];
  gHelpers.geocode({address: anchor.fullAddress}, function(coords) {
    anchor.coordinates = coords;
    req.body[req.body.length - 1] = anchor;
    // setSearchArea should take an array, not single object
    // TODO: get user's anchors from DB and add new anchor onto it
    // yelp.setSearchArea should be the call back to the DB insert
    // Currently using local, non-persistent storage at line 39
    yelp.setSearchArea(req.body, function(data) {
      res.send(data);
    });
  })
}

exports.loadAnchors = function (req, res, next) {
  anchorsDb.findById_Anchors(req.user).then(function(results) {
  var anchorsList = [];

  if(req.user) {
    results.forEach(function(anchor) {
      var splitAddress = anchor.anchor_address.split('/?><');
      var firstLine = splitAddress[0] + ', ';
      var secondLine = splitAddress[1] + ', ' + splitAddress[2] + ' ' + splitAddress[3];

      var anchor = {
        name: anchor.anchor_name,
        coordinates: JSON.parse(results[0].anchor_coordinates),
        splitAddress: [firstLine, secondLine],
        travel_mode: anchor.travel_mode
      }

      anchorsList.push(anchor);
      console.log(anchorsList)
    })
      res.status(200).send(anchorsList)
    } else {
      res.status(200).send(anchorsList)
    }
  })
}