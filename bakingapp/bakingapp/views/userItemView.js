var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;
var template = require("../templates/userItem.html");
var requestModel = require('../models/request');

module.exports  = Backbone.View.extend({

	events : {
    "click #request" : "toggleRequests"
  },

  initialize: function(model) {
    this.model = model.model || {};
    this.user = model.user;
    this.userRequests = model.userRequests;
    this.render();
  },

  render: function() {
    this.requestMayExist = this.userRequests.byUserAndModel(this.user.id, this.model.id);

    if (this.requestMayExist.length < 1) {
        this.model.set("isRequested", false);
    } 
    else {
      this.model.set("isRequested", true);
    }
    this.$el.html(template(this.model.toJSON()));
    return this;
  },

  toggleRequests: function() { 

    if (this.$el.find("#request").html().trim() === "I want this!") {

      var newRequest = new requestModel(
        {
          user: this.user.id,
          requestedItem : this.model.id
        }
      );

      newRequest.save();

      $.ajax({
        url: "/item/incReqCount",
        type: "PUT",
        data: {id: this.model.id}
      });

      this.$el.find("#request").text("I don't want this!");

    }

    else {

      $.ajax({
        url: "/item/decReqCount",
        type: "PUT",
        data: {id: this.model.id}
      });

      $.ajax({
        url: "/requests",
        type: "DELETE",
        data: {id: this.model.id, userid: this.user.id}
      });

      this.$el.find("#request").text("I want this!");

    }

  }
  
});

