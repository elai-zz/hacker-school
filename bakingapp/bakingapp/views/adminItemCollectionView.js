var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var adminItemView = require('../views/adminItemView');

module.exports  = Backbone.View.extend({

  initialize: function () {
  	this.collection.bind('add', this.addOne, this);
  },

  tagName: "div",

  el: "#desserts",

  render: function() {
  	this.collection.each(function(item) {
  		var dessertView = new adminItemView({model: item, collection: this.collection});
  		this.$el.append(dessertView.render().el);
  	}, this);

  	return this;
  },

  addOne: function (bakedGood) {
		var newItem = new adminItemView({
		    model: bakedGood,
		    collection : this.collection
		});

		this.$el.append(newItem.render().el);
  }
  
});

