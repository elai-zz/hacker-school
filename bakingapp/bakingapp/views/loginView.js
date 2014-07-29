var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;


var template = require("../templates/login.html");


module.exports = Backbone.View.extend({

  events: {
    'submit form': 'submit'
  },

  render: function () {
    this.$el.html(template());
    return this;
  }
  
});
