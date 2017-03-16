var keys = require('./config/API_KEYS');

var googleMapsClient = require('@google/maps').createClient({
  key: keys.G_DIRECTIONS_KEY
});

exports.getDirections = function(params, cb){
  googleMapsClient.directions(params, function(err, response) {
    if (!err) {
      console.log('success!');
      console.log(response.json);
      cb(response.json);
    }
  });
}

