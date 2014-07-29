var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;
var template = require("../templates/requestItem.html");


module.exports  = Backbone.View.extend({

	tagName: "tr",

  initialize: function(model) {
		this.model = model;
  },

  contactUser: function() {
  // 	if (this.phone !== "") {
		// 	$.ajax({
		//     url: "/sendText",
		//     type: "POST",
		//     data: {
		//     	"phone" : this.phone,
		//     	"item" : this.item
		//   	}
		//   });
		// }
		console.log(this.email);
		if (this.email !== "") {
			// also do ajax call
			console.log("here");
			$.ajax({
		    url: "/sendEmail",
		    type: "POST",
		    data: {
		    	"email" : this.email,
		    	"item" : this.item
		  	}
		  });
		}
  },

  render: function() {
		var id = this.model.id;
		this.user = "name";
		this.item = "item";

		$.ajax({
	      url: "/items/" + this.model.get("requestedItem"),
	      type: "GET",
	      dataType: 'json'
	    });

	    var getItem = $.get("/items/" + this.model.get("requestedItem"), function(data,status){
	   		return data;
			});

	   	var getUser = $.get("/users/" + this.model.get("user"), function(data,status){
				return data;
			});

		var that = this;

		$.when(getUser, getItem).done( function (user,item) {
			console.log(user);
			var username = JSON.parse(user[0]).username;
			var phoneNumber = JSON.parse(user[0]).phone;
			var email= JSON.parse(user[0]).email;
			var itemName = JSON.parse(item[0]).name;
	    
		    that.$el.html(template(
				{
					user: username,
					id: id,
					item: itemName
				}));

			that.user = username;
			that.item = itemName;
			that.phone = phoneNumber;
			that.email = email;

	  });

		return this;

  }

  
});

