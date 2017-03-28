var should = require('chai').should();
var chai = require('chai');
var request = require('supertest');
var express = require('express');
// var server = request('http://localhost:8080');
var server = request('http://etapartments-staging.herokuapp.com/');

// var app = require('../server.js');

var expect = chai.expect;

describe('utils', function(){
  var utils = require('../server/utils/utils');

  it('should calculate a centroid given several coordinates', function(){
    var testCoords = [[0,0], [2,2], [0,2], [2,0]];
    var centroid = utils.findCentroid(testCoords);
    expect(centroid).to.deep.equal({ lat: 1, lng: 1 });
  });

  it('should calculate a centroid given a single coordinate', function(){
    var testCoords = [[2,2]];
    var centroid = utils.findCentroid(testCoords);
    expect(centroid).to.deep.equal({ lat: 2, lng: 2 });
  });

  it('should return the distance between two points', function() {
    //distance between Hack Reactor and the Ferry Building
    var testCoords = [[37.783743, -122.409090], [37.795204, -122.393536]];
    var dist = utils.getMaximumDist(testCoords);
    var roundedDist = Math.floor(dist) - Math.floor(dist)%100;
    expect(roundedDist).to.equal(900);
  });

  it('should return the maximum distance between two coordinates given a set of coordinates', function() {
    //add another point between the two, should return same distance
    var testCoords = [[37.783743, -122.409090], [37.795204, -122.393536], [37.793152, -122.396850]];
    var dist = utils.getMaximumDist(testCoords);
    var roundedDist = Math.floor(dist) - Math.floor(dist)%100;
    expect(roundedDist).to.equal(900);
  });
});

describe('API helpers', function () {
  var gHelpers = require('../server/utils/gHelpers');
  var yelpHelper = require('../server/utils/yelpHelper');

  describe('getTravelTimes', function() {

    it('should return an array of integers', function() {
      server.get('/times')
      .expect(function (res) {
        Array.isArray(res.body) === true;
        typeof res.body[0] === "number";
      })
    });
  });

  describe('geocode', function() {

    it('should return an object with a latitude and longitude', function() {
    server.get('/geo')
    .expect(function (res) {
      expect(res.body).to.have.property("lat")
      expect(res.body).to.have.property("lng")
    })

    });  
  });

  describe('yelp', function() {

    it('should return an object with an array of businesses', function() {
      server.post('/search')
      .send({ 
    anchors: [
      {
        name: 'Hack Reactor', 
        address: '944 Market St, San Francisco, CA 94102', 
        coordinates: {lat: '37.783617', lng: '-122.408955'}
      },
      {
        name: 'Home', 
        address: '33 Pearl St, San Francisco, CA 94103', 
        coordinates: {lat: '37.770841', lng: '-122.423786'}
      },
    ],
    yelpParams: { 
      term: 'bars', 
      price: '2', 
      rating: '2', 
      open_now: true 
    },
    travelParams: { 
      travel_mode: 'driving', 
      travel_time: 10 
    } 
    })
    .expect(function(res) {
      expect(res.body).to.have.property("businesses")
    })

    });
  });
});


describe('anchors', function() {
  it('should accept anchors', function(done) {
    server
    .post('/anchor')
    .send([ { name: '23 Pearl St',
    address: '23 Pearl Street',
    city: 'San Francisco',
    state: 'CA',
    zip: 94103,
    travel_mode: 'driving',
    fullAddress: '23 Pearl Street, San Francisco, CA 94103',
    splitAddress: [ '23 Pearl Street', 'San Francisco, CA 94103' ] } ])
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
