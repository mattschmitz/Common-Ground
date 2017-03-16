var express = require('express')
var path = require('path')
var app = express()
var yelp = require('../yelpHelper')

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)))

app.get('/', function (req, res) {
  res.send('Hello Matt The Man!')
})

app.get('/yelp', function (req, res) {

  //fetch with dummy data
  yelp.fetchBusinesses({
        "latitude": 37.7776799,
        "longitude": -122.40709,
        "radius": 1000
      }, function(data) {
    res.send(data);
  });
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})