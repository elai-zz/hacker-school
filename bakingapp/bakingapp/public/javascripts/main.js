var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
_.$ = $;
Backbone.$ = $;
var loginView = require('../../views/loginView');
var userHomeView = require('../../views/userHomeView');

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
  	// greet person
      $.ajax({
        url: "/user",
        success: function(res) {
          if (res.username) {
            var userView = new userHomeView({model:res});
          }

          else {
            var userView = new userHomeView({model:{username:"guest", type: "guest"}});
          }
          // if (res.type) == "admin" {
          //   // show the admin page
          // }

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



