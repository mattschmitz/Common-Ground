var should = require('chai').should();
var chai = require('chai');
var request = require('supertest');
var express = require('express');
var server = request('http://localhost:8080');
// var app = require('../server.js');

var expect = chai.expect;

describe('utils', function(){
  var utils = require('../server/utils/utils');

  it('should calculate a centroid given several coordinates', function(){
    var testCoords = [[0,0], [2,2], [0,2], [2,0]];
    var centroid = utils.findCentroid(testCoords);
    expect(centroid).to.deep.equal([1,1]);
  });

  it('should calculate a centroid given a single coordinate', function(){
    var testCoords = [[2,2]];
    var centroid = utils.findCentroid(testCoords);
    expect(centroid).to.deep.equal([2,2]);
  });
})


describe('anchors', function() {
  it('should accept anchors', function(done) {
    server
    .post('/anchor')
    .send({ 
      name: 'Mathias',
      address: '23 Pearl St.',
      city: 'San Francisco',
      state: 'CA',
      zip: 94103,
      travel_mode: 'driving' 
      })
    .expect(200)
    .end(done);
  });

});

// describe('server', function(){
//   it('should return a 200 response', function() {
//     server
//     .get('/')
//     .set('Accept', 'application/json')
//     .expect("content-ty")
//     .expect(false)
//     .end(function(err, res){
//       expect(res.body).to.have.property("name");
//       done();
//     });
//   });
// })




  // var findCentroid = function(coords){
  //   var numCords = coords.length;

  //   var sumLats = 0, sumLongs = 0;
  //   for (var i = 0; i < numCords; i++) {
  //     sumLats += coords[i][0];
  //     sumLongs += coords[i][1];
  //   } 

  //   var avgLat = sumLats/numCords;
  //   var avgLong = sumLongs/numCords;

  //   return [avgLat, avgLong];
  // };