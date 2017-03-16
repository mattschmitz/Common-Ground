var request = require('request');


var fetchBusinesses = function(params, callback) {

var options = { 
  method: 'GET',
  url: 'https://api.yelp.com/v3/businesses/search',
  qs: params,
  headers: 
   { 'postman-token': '5073d720-9247-c291-f3cf-3701c76aca74',
     'cache-control': 'no-cache',
     authorization: 'Bearer 5QIID6d3tfk3LYmaXKPIJNvKPAqf6rbWs0i_IHAc1nWPC1OTXWzUnUPrLcaSR2jN9GkbNs-ATi_r_0oScbBob8lUBNWKX11LvELwP8i6-yQuHwbwWJNErnjYi7nJWHYx'
    } 
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  callback(body);
});

}

module.exports.fetchBusinesses = fetchBusinesses;
