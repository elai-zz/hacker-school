
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

var ItemModalView = Backbone.View.extend({

  initialize: function() {
    console.log(this.model.toJSON());
  },

  el: "#modal",

  render: function() {
    var template = _.template($('#adminEditModalTemplate').html());
    this.$el.html(template(this.model.toJSON()));
    this.$el.find('#adminEditModal').modal();
    return this;
  }

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
    var detailedView = new ItemModalView({model:this.model});
    detailedView.render();
  },

  clear : function () {
    this.model.destroy();
  }

})
