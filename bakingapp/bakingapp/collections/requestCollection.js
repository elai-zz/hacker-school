var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Request = require('../models/request');


module.exports = Backbone.Collection.extend({
	  
	model: Request,
	
	url: "/requests",

	byUser: function(userID) {

	    var gf = this.models.filter(function(model) {
  			return (model.get("user") === userID);
  		});

	    return filtered;
  	},

  	byUserAndModel: function(userId, modelId) {
  		var gf = this.models.filter(function(model) {
  			return (
  				model.get("user") === userId &&
  				model.get("requestedItem") === modelId
  			);
  		});
  		return gf;
  	}

});