var yelp = require('./utils/yelpHelper');
var gHelpers = require('./utils/gHelpers');
var rankLocations = require('./utils/rankLocations');
//add body parser...

exports.getResults = function(req, res){

  // //currently, anchor:
  // [ { name: 'Matthew S Schmitz',
  //   address: '824 East Forest Hills Blvd, Durham, NC 27707' } ] [ [ 35.982934, -78.9101589 ] ]

  // //would like req.body to be of form:
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

  //dummy data
  var anchors = [
      {
        name: 'Hack Reactor', 
        address: '944 Market St, San Francisco, CA 94102', 
        coordinates: {lat: '37.783617', lng: '-122.408955'}
      }, 
      {
        name: 'Home', 
        address: '33 Pearl St, San Francisco, CA 94103', 
        coordinates: {lat: '37.770841', lng: '-122.423786'}
      },
    ]

  // console.log('request-handler.js req.body:', req.body);

  yelp.getBusinesses(req.body.yelp, function(yelpResults) {
    rankLocations(yelpResults, anchors, req.body.google, function(rankedResults){
      res.send(rankedResults);
    });
  });
}


exports.addAnchor = function(req, res) {
  var address = req.query.anchor_address + ',' + req.query.anchor_city + ',' + req.query.anchor_state + ' ' + req.query.anchor_zip;
  var anchor = {
    name: req.query.anchor_name,
    address: address
  };
  gHelpers.geocode({address: address}, function(coords) {
    yelp.setSearchArea(anchor, coords);
    res.sendStatus(204);
  })
}