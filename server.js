var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var yelp = require('./server/utils/yelpHelper');
var gHelpers = require('./server/utils/gHelpers');

var app = express();

var port = process.env.PORT || 8080;

//serve static files:
app.use('/', express.static(path.join(__dirname)));
app.use('/htmlTemplates', express.static(path.join(__dirname, '/htmlTemplates')));
app.use('/server', express.static(path.join(__dirname, '/server')));
app.use('/config', express.static(path.join(__dirname, '/config')));

app.use(bodyParser.json());

//add anchors to map and database
app.get('/anchor', function(req, res) {
  var address = req.query.anchor_address + ',' + req.query.anchor_city + ',' + req.query.anchor_state + ' ' + req.query.anchor_zip;
  var anchor = {
    name: req.query.anchor_name,
    address: address
  };
  gHelpers.geocode({address: address}, function(coords) {
    yelp.setSearchArea(anchor, coords);
    res.sendStatus(204);
  })
});

//get results of search
app.post('/search', function(req, res) {
  yelp.getBusinesses({
        "term": req.body.yelp.search_term,
        "price": req.body.yelp.price,
        "open_now": req.body.yelp.open_now
      }, function(data) {
    res.send(data);
  });
})

//START SERVER: 
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})


//*********THESE ROUTES FOR DEVELOPMENT & TESTING ONLY: 
  app.get('/directions', function(req, res){
    //get directions with dummy data
    gHelpers.getDirections({
      origin: '944 Market St, San Francisco, CA 94102',
      destination: '25 Pearl St, San Francisco, CA 94103', 
      mode: 'transit'
    }, function(data){
      res.send(data);
    })
  })

  app.get('/times', function(req, res){
    //get with dummy data
    gHelpers.getTravelTimes({
      origins: '37.783617,-122.408955', //'944 Market St, San Francisco, CA 94102',
      destinations: '37.770841,-122.423786|37.777179,-122.425929',//'33 Pearl St, San Francisco, CA 94103|565 Grove St, San Francisco, CA 94102', 
      mode: 'driving'
    }, function(data){
      res.send(data);
    })
  })
