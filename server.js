var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var yelp = require('./server/utils/yelpHelper');
var gHelpers = require('./server/utils/gHelpers');
var handler = require('./server/request-handler');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var authUsers = require('./server/db/Models/users')
var anchorsDb = require('./server/db/Models/anchors')

process.stdout.write('Here in server.js funny name!');



var app = express();

app.use(function(req, res, next) {
  process.stdout.write('before auth req.url: ' + req.url + '\n');
  next();
})

var port = process.env.PORT || 8080;

//serve static files:
app.use('/', express.static(path.join(__dirname)));
app.use('/htmlTemplates', express.static(path.join(__dirname, '/htmlTemplates')));
app.use('/server', express.static(path.join(__dirname, '/server')));
app.use('/config', express.static(path.join(__dirname, '/config')));

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret: 'keyboard cat'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(function(req, res, next) {
  process.stdout.write('req.url: ' + req.url + '\n');
  next();
})

app.get('/testing', function(req, res) {
  res.status(200).send();
})
//dummy strategy
//if username is tyler, successful login
//else unsuccessful


//signup and login routes
//choose redirect routes

passport.use(new LocalStrategy(
  function(username, password, done) {
          authUsers.loginAuth(username, password).then(function(results) {
            if(results) {
              return done(null, username, {message: 'correct'})
            } else {
              return done(null, false, {message: 'try again'})
            }
          })
  }
));

//in the future, we will query the database here
//this will call our crypto/serialization methods
passport.serializeUser(function(user, done) {
  done(null, user);
});

//need to implement a find user id db function
passport.deserializeUser(function(user, done) {
  done(null, user);
});

//signup and login routes
app.post('/signup', function (req, res) {
  authUsers.findUser(req.body.username).then(function(results) {
    if(results[0]){
      res.status(400).send()
      return;
    } else {
      authUsers.createUser(req.body)
      res.status(200).send()
    }
  })
})

//choose redirect routes
app.post('/login', function(req, res, next) {
    passport.authenticate('local', {successRedirect: '/loadanchors',
                                   failureRedirect: '/server',
                                   failureFlash: true })(req, res, next);
  }
);

app.all('/loadanchors', handler.loadAnchors);

app.post('/deleteanchor', function(req, res, next) {
  anchorsDb.deleteAnchor(req.body.rowId)
})

//add anchors to map and database
app.post('/anchor', handler.addAnchor);

app.post('/search', handler.getResults);

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})

// logs the user out in passport's state
app.get('/logout', function(req, res){
  req.logout();
  console.log('logout is successful!')
  res.redirect('/');
});

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

  app.get('/geo', function(req, res) {
    gHelpers.geocode({address: '944 Market St, San Francisco, CA 94102'}, function(data){
      res.send(data);
    })
  })
