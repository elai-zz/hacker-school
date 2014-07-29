var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var template = require("../templates/userHome.html");
var ItemCollection = require('../collections/itemCollection');
var RequestCollection = require('../collections/requestCollection');
var userItemCollectionView = require('../views/userItemCollectionView');

module.exports = Backbone.View.extend({

  initialize: function (user) {
  	this.user = user || {};
    this.userRequests = new RequestCollection;

  	this.items = new ItemCollection;
    var that = this;
    $.when(this.items.fetch(), this.userRequests.fetch()).done(function(){
      that.render();
    });

  },

  render: function () {
    this.$el.html(template(this.user));
    var newView = new userItemCollectionView(
    {
      collection: this.items, 
      user: this.user,
      userRequests: this.userRequests
    });

    this.$el.append(newView.render().el);
    return this;
  } 

});

