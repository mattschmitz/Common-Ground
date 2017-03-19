var express = require('express')
// Added to serve static files
var path = require('path')
var app = express()
var yelp = require('./server/yelpHelper')
var gDirections = require('./gDirections')

var port = process.env.PORT || 8080;

// Added to serve static files out of htmlTemplates
app.use('/', express.static(path.join(__dirname)));
app.use('/htmlTemplates', express.static(path.join(__dirname, '/htmlTemplates')));
app.use('/server', express.static(path.join(__dirname, '/server')));
app.use('/config', express.static(path.join(__dirname, '/config')));

app.get('/', function (req, res) {
  res.redirect('index.html')
})

app.get('/directions', function(req, res){

  //get with dummy data
  gDirections.getDirections({
    origin: '944 Market St, San Francisco, CA 94102',
    destination: '25 Pearl St, San Francisco, CA 94103', 
    mode: 'transit'
  }, function(data){
    res.send(data);
  })
})

app.get('/times', function(req, res){
  //get with dummy data
  gDirections.getTravelTimes({
    origins: '944 Market St, San Francisco, CA 94102',
    destinations: '25 Pearl St, San Francisco, CA 94103|565 Grove St, San Francisco, CA 94102', 
    mode: 'driving'
  }, function(data){
    res.send(data);
  })
})

app.get('/geocode', function(req, res){
  gDirections.geocode({
    address: '944 Market St, San Francisco, CA 94102'
  }, function(data){
    res.send(data);
  })
})

app.get('/query', function (req, res) {
  //get with dummy data
  console.log(req.query);

  yelp.getBusinesses({
        "term": req.query.search_term,
        "price": req.query.price,
        "open_now": req.query.open_now
      }, function(data) {
    res.send(data);
  });

});

app.get('/anchor', function(req, res) {
  var address = req.query.anchor_address + ',' + req.query.anchor_city + ',' + req.query.anchor_state + ' ' + req.query.anchor_zip;
  var anchor = {
    name: req.query.anchor_name,
    address: address
  };

  gDirections.geocode({address: address}, function(coords) {
    yelp.setSearchArea(anchor, coords);
    res.send(coords);
  })

});

app.get('/map', function(req, res) {
  res.redirect('./htmlTemplates/map.html');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})