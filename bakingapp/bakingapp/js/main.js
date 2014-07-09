var Item = Backbone.Model.extend({
  
  defaults: {
  		"name": "mystery baked good",
  		"ingredients": "love",
  		"status": "not started",
  		"img" : "",
    },

  idAttribute: "_id",

  url: "/items"

});

var ItemCollection = Backbone.Collection.extend({
	  
	model: Item,
	url: "/items"

});

var ItemView = Backbone.View.extend({

	initialize: function() {
		this.render();
		this.listenTo(this.model, 'change', this.render);
	},

	events : {
		"click .remove" : "clear",
		"click .edit" : "editProperties"
	},

	render: function() {
		var template = _.template($('#item_template').html());
        this.$el.html(template(this.model.toJSON()));
        this.listenTo(this.model, 'destroy', this.remove);
        return this;
	},

	editProperties: function() {
		$('#adminEditModal').modal();
	},

	clear : function () {
		this.model.destroy();
	}

})

var ItemCollectionView = Backbone.View.extend({
  
  tagName: "div",

  el: "#desserts",

  initialize: function () {
  },

  render: function() {
  	this.collection.each(function(item) {
  		var dessertView = new ItemView({model: item});
  		this.$el.append(dessertView.el);
  	}, this);
  }

} );

var items = new ItemCollection;
items.fetch({
	success:function(){
		var newView = new ItemCollectionView({collection:items});
		newView.render();
	}
});


