var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;


var template = require("../templates/login.html");


var LoginView = Backbone.View.extend({

  template: _.template(template()),

  events: {
    'submit form': 'submit',
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  submit : function(e) {
    alert("hey");
  }
});

module.exports = new LoginView();
