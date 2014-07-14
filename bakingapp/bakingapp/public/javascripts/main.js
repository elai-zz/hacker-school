var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
_.$ = $;
Backbone.$ = $;
var loginView = require('../../views/loginView');
var userHomeView = require('../../views/userHomeView');
//var adminHomeView = require('../../views/adminHomeView');


var Item = Backbone.Model.extend({
  
  defaults: {
  		"name": "mystery baked good",
  		"ingredients": "love",
  		"status": "not started",
  		"img" : "",
    },

  idAttribute: "_id",

  urlRoot: "/items"

});

var ItemCollection = Backbone.Collection.extend({
	  
	model: Item,
	url: "/items"

});


var Router = Backbone.Router.extend({

  initialize: function () {
  	console.log('hello im here');
  },

  routes: {
    "login": "login",  
    "" : "home"
  },

  login: function () {
  	$('#content').html(loginView.render().el);
  },

  home: function () {
    $.ajax({
      url: "/user",
      success: function(res) {

        // actually, this person is an admin
        if (res.type) == "admin" {
          var adminView = new adminHomeView(res);
        }

        if (res.username) {
          var userView = new userHomeView(res);
        }

        else {
          var userView = new userHomeView({username:"guest", type: "guest"});
        }

        $('#content').html(userView.render().el);
      }
    });
  }


});



// var items = new ItemCollection;
// items.fetch({
// 	success:function(){
// 		var newView = new ItemCollectionView({collection:items});
// 		newView.render();
// 	}
// });

$(document).ready(function () {
	var router = new Router();
	Backbone.history.start();
});



