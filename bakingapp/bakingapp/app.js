var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose/');


var routes = require('./routes/index');
var users = require('./routes/users');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/MyDatabase');
var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: String,
      password: String,
      type: String
    }, {
      collection: 'userInfo'
    });
var User = mongoose.model('userInfo', UserDetail);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// accepting post request for login
// redirects to homepage on success
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// middleware to check for authentication for admin
// if not, returns to homepage
function ensureAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type == 'admin') { return next(); }
    res.redirect('/')
}

app.get('/login', function(req, res) {
  if (req.isAuthenticated()) {res.redirect('/')}
  res.render('login');
});

app.get('/admin', ensureAuthenticatedAdmin, function(req, res) {
    res.render('admin', {user: req.user}); 
});


app.get('/', function(req, res) {
  if (req.isAuthenticated()) {console.log('authenticated');}
  res.render('index', { title: 'Express' , user : req.user });
});


// authentication function 
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {    
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        if (user.password != password) {
            return done(null, false);
         }
         return done(null, user);

    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
