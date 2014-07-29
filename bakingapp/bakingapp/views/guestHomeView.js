var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var template = require("../templates/guestHome.html");
var guestItemView = require('../views/guestItemView');
var guestItemCollectionView = require('../views/guestItemCollectionView');
var ItemCollection = require('../collections/itemCollection');

module.exports = Backbone.View.extend({

  initialize: function (user) {
  	this.items = new ItemCollection;
    var that = this;
    $.when(this.items.fetch()).done(function(){
      that.render();
    });

  },

  render: function () {
    this.$el.html(template());
    var newView = new guestItemCollectionView(
    {
      collection: this.items
    });

    this.$el.append(newView.render().el);
    return this;
  } 

});

