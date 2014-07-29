var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;
var template = require("../templates/guestItem.html");

module.exports  = Backbone.View.extend({

  initialize: function(model) {
    this.model = model.model || {};
    this.render();
  },

  render: function() {
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
  
});

