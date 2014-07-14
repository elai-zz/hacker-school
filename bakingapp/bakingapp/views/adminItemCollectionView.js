var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var adminItemView = require('../views/adminItemView');

module.exports  = Backbone.View.extend({

  tagName: "div",

  el: "#desserts",

  render: function() {
  	this.collection.each(function(item) {
  		var dessertView = new adminItemView({model: item.toJSON()});
  		this.$el.append(dessertView.el);
  	}, this);
  	return this;
  }
  
});

