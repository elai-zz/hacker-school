var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  
  defaults: {
  		"user": "",
  		"requestedItem" : ""
    },

  idAttribute: "_id",

  urlRoot: "/requests"

});