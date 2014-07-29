var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  
  defaults: {
  		"username": "user",
  		"password": "password",
  		"type" : "user",
  		"phone" : "(123) 456-7890",
  		"email" : "foobar@example.com"
    },

  idAttribute: "_id",

  urlRoot: "/users"

});