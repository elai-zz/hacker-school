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
var ObjectID = require('mongodb').ObjectID;

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

// twilio set up
var accountSid="AC63305abec3ec4d62966a741ba0e86309"
var authToken="a91314f6b41510990c67934faee318cb"
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

// nodemailer set up
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


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
      img: String,
      request: Number
    }, {
      collection: 'itemInfo'
  });


var RequestDetail = new Schema({
      user: String,
      requestedItem: String
    }, {
      collection: 'requestInfo'
  });


var User = mongoose.model('userInfo', UserDetail);
var Item = mongoose.model('itemInfo', ItemDetail);
var Request = mongoose.model('requestInfo', RequestDetail);

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


//////////////////////////////////////////////////////////////// API calls

//Get list of users (only for admin)
app.get('/users', ensureAuthenticatedAdmin, function (req, res) {
    User.find().lean().exec({}, function (err, user) {
      return res.end(JSON.stringify(user));
    })
});

//Getting an existing item
app.get('/users/:id', function (req, res, next) {
  var id = req.params.id;
  return User.findOne({_id:id}, function (err, user) {
    return res.end(JSON.stringify(user));
  })

});

// Posting a new user
// TODO: do data validation!
app.post('/users', function (req, res) {
  var derp = new User(req.body);
  derp.save(function(err){
    if (err) return handleError(err);
    else {
      res.send(200, {redirect: '/'});
    }
  });

});

// Get current user
app.get('/user', function (req, res, next) {
  if (req.isAuthenticated()) {
    User.find({ username: req.user.username}, {_id:1}, function (err, user){
      var id = user[0]._id;
      return res.send({
        phone: req.user.phone,
        username: req.user.username, 
        type: req.user.type,
        id : id
      });
    });
  }
  else {
    return res.send(null);
  }
});

//List items
// app.get('/items/:auth', function (req, res) {
//   console.log(req.params.auth);
//     Item.find().lean().exec({}, function (err, items) {
//       res.setHeader('Content-Type', 'application/json');
//       return res.end(JSON.stringify(items));
//     })
// });

// Posting a new item
app.post('/items', function (req, res) {
  var dessert = new Item(req.body);
  dessert.save(function(err){
    if (err) return handleError(err);
  });

});

//Get item
app.get('/items', function (req, res, next) {
  Item.find().lean().exec({}, function (err, item) {
      return res.end(JSON.stringify(item));
    })
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
      res.send(200, "OK");
    } 
  })
});

// Updating an item
app.put('/items/:id', function (req, res, next) {
  return Item.update({_id:req.params.id}, req.body, function (err, item) {
    if (err) return res.end(500, "NOT OK");
    return res.send(200, "OK");
  })
});

// inc the request count
app.put('/item/incReqCount', function (req, res, next) {
  Item.update({_id: ObjectID(req.body.id)}, {$inc: {"request": 1}}, function (err, item) {
    if (err) return res.end(500, "NOT OK");
    return res.send(200, "OK");
  });
});

// dec the request count
app.put('/item/decReqCount', function (req, res, next) {
  Item.update({_id: ObjectID(req.body.id)}, {$inc: {"request": -1}}, function (err, item) {
    if (err) return res.end(500, "NOT OK");
    return res.send("OK", 200);
  })
});


//List requests
app.get('/requests', function (req, res) {
    Request.find().lean().exec({}, function (err, requests) {
      return res.end(JSON.stringify(requests));
    })
});

//Get a request
app.get('/requests/:id', function (req, res) {
  var id = req.params.id;
  return Request.findOne({_id:id}, function (err, user) {
    return res.end(JSON.stringify(user));
  })
});


// Posting a new request
app.post('/requests', function (req, res) {
  var newRequest = new Request(req.body);
  newRequest.save(function(err){
    if (err) return handleError(err);
  });
});

app.delete('/requests', function (req, res, next) {
  Request.remove({requestedItem:req.body.id, user:req.body.userid}, function (err) {
    if (err) {
      return handleError(err);
     }
    else{
      res.end("OK", 200);
    } 
  })
});

// twilio stuff

// Posting a new twilio
app.post('/sendText', function (req, res) {
  var phone = "+1" + req.body.phone.replace(/[^0-9]+/g, '');  
  client.messages.create({
    body: "Minnie is making " + req.body.item + "!",
    to: phone,
    from: "+19095388653"
  }, function(err, message) {
      process.stdout.write(message.sid);
  });
});

// Posting to send email
app.post('/sendEmail', function (req, res) {
  var receiver = req.body.email;
  var emailBody = "Minnie is making " + req.body.item + "!"
  console.log(receiver);
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: 'minzeycat@gmail.com',
        pass: 'p981046!'
    }
  }));

  transporter.sendMail({
    from: 'minzeycat@gmail.com',
    to: receiver,
    subject: 'Notification from BakingApp',
    text: emailBody
  }, function (error, response) {
    //Email not sent
    if (error) {
      console.log(error);
      res.end("Email send Falied");
    }
    //email send sucessfully
    else {
      res.end("Email send sucessfully");
      console.log(response);
      return res.end(200, "OK");
    }
  });

});

// actually don't remove
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// actually don't remove
app.get('/login', function (req, res) {
  if (req.isAuthenticated()) {res.redirect('/');}
  res.redirect('/#login');
});

app.get('/', function(req, res) {
  if (req.isAuthenticated()) {console.log('authenticated');}
  res.render("index.html", {title: "Baking App"});
});


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