var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var template = require("../templates/adminItem.html");

module.exports  = Backbone.View.extend({


  initialize: function(model) {
    this.render();
    this.model = model || {};
  },

  render: function() {
    this.$el.html(template(this.model));
    return this;
  }
  
});

