// at some point, put these in diff files
// bcrypt
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
var router = express.Router();

// where the HTML files reside
var htmlDir = './views/'

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/');
app.set('view engine', 'html');

//////////////////////////////////////////////////////////////// db
mongoose.connect('mongodb://localhost/MyDatabase');
var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: String,
      password: String,
      type: String
    }, {
      collection: 'userInfo'
    });

var ItemDetail = new Schema({
      name: String,
      ingredients: String,
      status: String,
      img: String
    }, {
      collection: 'itemInfo'
    });

var User = mongoose.model('userInfo', UserDetail);
var Item = mongoose.model('itemInfo', ItemDetail);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));

app.use(passport.initialize());
app.use(passport.session());

// accepting post request for login
// redirects to homepage on success

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/#login',
                                   failureFlash: true })
);

//////////////////////////////////////////////////////////////// passport

// middleware to check for authentication for admin
// if not, returns to homepage
function ensureAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.type == 'admin') { return next(); }
    res.redirect('/')
}

// authentication function 
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    User.findOne({ username: username }, function (err, user) {   
        console.log(user); 
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


//////////////////////////////////////////////////////////////// API calls

// Get current user

app.get('/user', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.send({username: req.user.username, type: req.user.type});
  }
  else {
    return res.send(null);
  }
});

//List items
app.get('/items', function (req, res) {
    Item.find().lean().exec({}, function (err, items) {
      return res.end(JSON.stringify(items));
    })
});

// Posting a new item
app.post('/items', function (req, res) {
  console.log(req.body);
  var dessert = new Item(req.body);
  dessert.save(function(err){
    if (err) return handleError(err);
  });

});

//Getting an existing item
app.get('/items/:id', function (req, res, next) {
  var id = req.params.id;
  return Item.findOne({_id:id}, function (err, item) {
    return res.end(JSON.stringify(item));
  })

});

// Removing an item

app.delete('/items/:id', function (req, res, next) {
  Item.remove({_id:req.params.id}, function (err) {
    if (err) {
      return handleError(err);
     }
    else{
      res.end("OK", 200);
    } 
  })

});



// move to client side
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Logging in
// move to client side
// app.get('/login', function(req, res) {
//   if (req.isAuthenticated()) {res.redirect('/')}
//   res.render('login');
// });

// move to client side
app.get('/admin', ensureAuthenticatedAdmin, function(req, res) {
    res.render('admin', {user: req.user}); 
});


app.get('/', function(req, res) {
  if (req.isAuthenticated()) {console.log('authenticated');}
  res.render("index.html", {title: "Baking App"});
});


app.use('/', routes);
// app.use('/users', users);

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
