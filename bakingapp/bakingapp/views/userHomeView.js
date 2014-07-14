var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var template = require("../templates/userHome.html");


module.exports = Backbone.View.extend({


  initialize: function (model) {
  	this.model = model || {};
  },

  render: function () {
  	console.log(this.model);
    this.$el.html(template(this.model));
    return this;
  } 

});

