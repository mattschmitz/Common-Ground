var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var yelp = require('./server/utils/yelpHelper');
var gHelpers = require('./server/utils/gHelpers');
var handler = require('./server/request-handler');

var app = express();

var port = process.env.PORT || 8080;

//serve static files:
app.use('/', express.static(path.join(__dirname)));
app.use('/htmlTemplates', express.static(path.join(__dirname, '/htmlTemplates')));
app.use('/server', express.static(path.join(__dirname, '/server')));
app.use('/config', express.static(path.join(__dirname, '/config')));

app.use(bodyParser.json());

//add anchors to map and database
app.get('/anchor', handler.addAnchor);

app.post('/search', handler.getResults);

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
