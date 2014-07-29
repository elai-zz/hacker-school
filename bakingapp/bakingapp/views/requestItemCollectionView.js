var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var requestItemView = require('../views/requestItemView');
var listOfRequestViews = {};

module.exports  = Backbone.View.extend({

  tagName: "tbody",

  el: "#requests",

  initialize: function(params) {
  	this.collection = params.collection;
  },

  contactUser: function(id) {
    var val = listOfRequestViews[id];
    val.contactUser();
  },

  render: function() {
    this.collection.each(function(request) {
      var requestView = new requestItemView(request);
      this.$el.append(requestView.render().el);
      listOfRequestViews[request.id] = requestView;
    }, this);

    return this;

  }
  
});

