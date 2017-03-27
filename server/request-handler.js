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
    // Temporary work around
    // res.send(yelpResults);
    rankLocations(yelpResults, req.body.anchors, req.body.travelParams, function(rankedResults){
      res.send(rankedResults);
    });
  });
}


exports.addAnchor = function(req, res) {
  var fullAddress = req.body.address + ', ' + req.body.city + ', ' + req.body.state + ' ' + req.body.zip;
  req.body.fullAddress = fullAddress;
  req.body.splitAddress = [];
  req.body.splitAddress.push(req.body.address);
  req.body.splitAddress.push([req.body.city,req.body.state,req.body.zip].join(', '));
  gHelpers.geocode({address: address}, function(coords) {
    req.body.coordinates = coords;
    yelp.setSearchArea(req.body, function(data) {
      res.send(data);
    });
  })
}