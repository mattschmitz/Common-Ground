var request = require('request');
var keys = require('./config/API_KEYS');

var getBusinesses = function(params, callback) {

var options = { 
  method: 'GET',
  url: 'https://api.yelp.com/v3/businesses/search',
  qs: params,
  headers: 
   { 'postman-token': '5073d720-9247-c291-f3cf-3701c76aca74',
     'cache-control': 'no-cache',
     authorization: keys.YELP_KEY
    } 
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  callback(body);
});

}

module.exports.getBusinesses = getBusinesses;
