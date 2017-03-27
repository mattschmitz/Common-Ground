var yelp = require('./utils/yelpHelper');
var gHelpers = require('./utils/gHelpers');
var rankLocations = require('./utils/rankLocations');
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
  yelp.getBusinesses(req.body.yelpParams, function(yelpResults) {
    rankLocations(yelpResults, req.body.anchors, req.body.travelParams, function(rankedResults){
      res.send(rankedResults);
    });
  });
}

var anchors = [];

exports.addAnchor = function(req, res) {
  var fullAddress = req.body.address + ', ' + req.body.city + ', ' + req.body.state + ' ' + req.body.zip;
  req.body.fullAddress = fullAddress;
  req.body.splitAddress = [];
  req.body.splitAddress.push(req.body.address);
  req.body.splitAddress.push([req.body.city,req.body.state,req.body.zip].join(', '));
  gHelpers.geocode({address: fullAddress}, function(coords) {
    req.body.coordinates = coords;
    // setSearchArea should take an array, not single object
    // TODO: get user's anchors from DB and add new anchor onto it
    // yelp.setSearchArea should be the call back to the DB insert
    // Currently using local, non-persistent storage at line 39
    anchors.push(req.body);
    yelp.setSearchArea(anchors, function(data) {
      res.send(data);
    });
  })
}