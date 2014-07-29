var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var template = require("../templates/userProfile.html");
var userModel = require('../models/user');

var warning = function(message) {
    $('#alert_placeholder').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+
    	message + '</span></div>');
}

module.exports = Backbone.View.extend({
	events: {
    	"click .submit" : "addNewUser"
  	},


  	addNewUser: function () {
  		var un = this.$el.find('#usernameForm').val();
    	var pw = this.$el.find('#passwordForm').val();
    	var email = this.$el.find('#emailForm').val();
    	var phone = this.$el.find("#phoneForm").val();

  		this.user.save(
  			{
  				"username" : un,
  				"password" : pw,
  				"email" : email,
  				"phone" : phone

  			}, 
  			{
	  			success: function (model, response, options) {
	  				window.location = response.redirect;
	  			},
	  			error : function (model, response, options) {
	  				warning("All fields are required, check your inputs again!");

	  			}
  			}
  		);

  	},

	initialize: function (params) { 
		this.user = params || new userModel;

	},

	render: function () {
		this.$el.html(template(this.user.toJSON()));
		return this;
	}

});