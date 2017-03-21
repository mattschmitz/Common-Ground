var yelp = require('./utils/yelpHelper');
var gHelpers = require('./utils/gHelpers');
var rankLocations = require('./utils/rankLocations');
var request = require('request');
//add body parser...

exports.getResults = function(req, res){
  //dummy data
  // req.body = {
  //   anchors: [
  //     {lat: '37.783675', lng: '-122.408916', name: 'Hack Reactor'}, 
  //     {lat: '37.770841', lng: '-122.423786', name: 'Home'}
  //   ],
  //   yelp: {
  //     term: 'bars',
  //     price: 4,
  //     open_now: true
  //   },
  //   travel: {
  //     mode: 'transit',
  //     maxTime: undefined,
  //   }
  // }; 

  console.log('request-handler.js req.body:', req.body);

  yelp.getBusinesses({
        "term": req.body.yelp.term,
        "price": req.body.yelp.price,
        "open_now": req.body.yelp.open_now
      }, function(data) {
    res.send(data);
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