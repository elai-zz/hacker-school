var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;
var ItemModalView = require("../views/adminItemModalView.js");
var template = require("../templates/adminItem.html");


module.exports  = Backbone.View.extend({

	events : {
    "click .remove" : "clear",
    "click .edit" : "editProperties"
  },

  initialize: function(model) {
    this.model = model.model || {};
    this.collection = model.collection;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.detailedView = new ItemModalView({model:this.model, collection:this.collection});

  },

  editProperties: function() {
    this.detailedView.show();
  },

  clear : function () {
    this.model.destroy();
  },

  render: function() {
    this.$el.html(template(this.model.toJSON()));
    $('body').append(this.detailedView.render().el);
    return this;
  }
  
});

