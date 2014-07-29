var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var userItemView = require('../views/userItemView');

module.exports  = Backbone.View.extend({

  tagName: "div",

  el: "#desserts",

  initialize: function(params) {
  	this.user = params.user;
  	this.collection = params.collection;
    this.userRequests = params.userRequests;
  },

  render: function() {
  	user = this.user;
  	this.collection.each(function(item) {
  		var dessertView = new userItemView({model: item, user: user, userRequests: this.userRequests});
  		this.$el.append(dessertView.el);
  	}, this);

  	return this;
  }
  
});

