var api_keys = require('./api_keys');

var googleMapsClient = require('@google/maps').createClient({
  key: api_keys.directionsApiKey
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

