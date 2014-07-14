var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;
var adminItemCollectionView = require('../views/adminItemCollectionView');
var ItemCollection = require('../collections/itemCollection');
var template = require("../templates/adminHome.html");


module.exports = Backbone.View.extend({

  initialize: function (model) {
  	//get item collection
	  this.items = new ItemCollection;
	  var that = this;
	  this.items.fetch({
	  	success: function() {
	  		that.render();
	  	}
	  });

  },

  render: function () {
  	// renders dessert view
    this.$el.html(template());
    var newView = new adminItemCollectionView({collection: this.items});
    this.$el.append(newView.render().el);
    return this;
  } 

});

