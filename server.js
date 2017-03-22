var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var yelp = require('./server/utils/yelpHelper');
var gHelpers = require('./server/utils/gHelpers');
var handler = require('./server/request-handler');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var 

var app = express();

var port = process.env.PORT || 8080;

//serve static files:
app.use('/', express.static(path.join(__dirname)));
app.use('/htmlTemplates', express.static(path.join(__dirname, '/htmlTemplates')));
app.use('/server', express.static(path.join(__dirname, '/server')));
app.use('/config', express.static(path.join(__dirname, '/config')));

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.session());




//dummy strategy
//if username is tyler, successful login
//else unsuccessful

//in the future, we will query the database here
//this will call our crypto/serialization methods
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//signup and login routes
//choose redirect routes

passport.use(new LocalStrategy(
  function(username, password, done) {
      if (username === 'tyler') { return done(null, 'tyler', {message: 'correct'})}
      else { return done(null, false, {message: 'in else'})}
  }
));

//signup and login routes
//choose redirect routes
app.post('/login', function(req, res, next) {
    console.log(req.body.username);
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/server',
                                   failureFlash: true })(req, res, next);
  }

);

app.post('/signup', function (req, res) {
  findUser(req.user.username).then(function(results) {
    if(results[0]){
      res.status(400).send()
      return;
    } else {
      createUser(user)
      res.status(200).send()
    }
  })
})


//add anchors to map and database
app.post('/anchor', handler.addAnchor);

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