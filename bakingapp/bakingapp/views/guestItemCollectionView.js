var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var guestItemView = require('../views/guestItemView');

module.exports  = Backbone.View.extend({

  tagName: "div",

  el: "#desserts",

  render: function() {
  	this.collection.each(function(item) {
  		var dessertView = new guestItemView({model: item});
  		this.$el.append(dessertView.el);
  	}, this);

  	return this;
  }
  
});

