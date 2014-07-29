var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var template = require("../templates/request.html");
var requestColView = require('../views/requestItemCollectionView');
var requestCollection = require('../collections/requestCollection');

module.exports = Backbone.View.extend({


	events : {
    	"click .contact" : "contactSelected"
  	},

	initialize: function () { 
		this.collection = new requestCollection;
		var that = this;
		this.collection.fetch({
			success: function () {
				that.render();
			}
		});

	},

	render: function () {
		this.$el.html(template());
		this.newView = new requestColView({collection: this.collection}); 
		this.$el.append(this.newView.render().el);
    	return this;
	},

	contactSelected: function () {
		var that = this;
		$('input[type=checkbox]').each(function () {
			if (this.checked) {
				var checkedID = $(this).attr("id");
 				that.newView.contactUser(checkedID);
			}
  	});

	}

});