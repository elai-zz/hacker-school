var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;
var adminItemCollectionView = require('../views/adminItemCollectionView');
var ItemCollection = require('../collections/itemCollection');
var template = require("../templates/adminHome.html");
var adminItemModalView = require('../views/adminItemModalView');
var itemModel = require('../models/item');

module.exports = Backbone.View.extend({

  events: {
    "click .add" : "addNewItem"
  },

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
  },

  addNewItem: function() {
    var newItem = new itemModel;
    detailedView = new adminItemModalView({model: newItem, collection: this.items});
    this.$el.append(detailedView.render().el);
    detailedView.show();
  }

});

