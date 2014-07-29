var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
_.$ = $;
Backbone.$ = $;
var Backbone = require('backbone');
var loginView = require('../../views/loginView');
var userHomeView = require('../../views/userHomeView');
var adminHomeView = require('../../views/adminHomeView');
var guestHomeView = require('../../views/guestHomeView');
var requestView = require('../../views/requestView');
var userProfileView = require('../../views/userProfileView');

var Router = Backbone.Router.extend({

  routes: {
    "login": "login",  
    "" : "home",
    "home": "home",
    "register" : "register",
    "update_profile" : "updateProfile",
    "addNewBakedGood": "addNewBakedGood",
    "requests": "requests"
  },

  login: function () {
    var login = new loginView();
    $('#content').html(login.render().el);
  },

  register : function () {
    var newRegister = new userProfileView();
    $('#content').html(newRegister.render().el);
  },

  updateProfile : function () {
    // like not done lol

     $.ajax({
      url: "/user",
      success: function(res) {
        var updateProfile = new requestView(res);
        $('#content').html(updateProfile.render().el);
      }
    });
  },

  requests: function () {
    var request = new requestView();
    $('#content').html(request.render().el);
  },

  home: function () {
    $.ajax({
      url: "/user",
      success: function(res) {

        // actually, this person is an admin
        if (res.type === "admin") {
          var adminView = new adminHomeView(res);
          $('#content').html(adminView.$el);
        }

        else {
          if (res.username) {
            var userView = new userHomeView(res);
          }

          else {
            var userView = new guestHomeView();
          }

          $('#content').html(userView.render().el);
        }
      }
    });
  }
});


$(document).ready(function () {
	var router = new Router;
	Backbone.history.start();
});



