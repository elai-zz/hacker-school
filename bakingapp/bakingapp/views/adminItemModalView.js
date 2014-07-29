var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
_.$ = $;

var template = require("../templates/adminItemEditModal.html");

module.exports = Backbone.View.extend({

  events: {
    "click .save" : "updateProperties"
  },

  updateProperties: function () {
    this.$el.find('.modal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    
    var newName = this.$el.find('#name').val();
    var newIng = this.$el.find('#ingredients').val();
    var newStat = this.$el.find('#status').val();

    if (!this.collection.contains(this.model)) {
      this.collection.create({name: newName, ingredients: newIng, status: newStat});
    }
    else { 
      this.model.set({name: newName, ingredients: newIng, status: newStat});
      this.model.save();
    }


  },

  render: function() {
    this.$el.html(template(this.model.toJSON()));
    return this;
  },

  show: function() {
    this.$el.find('.modal').modal('show');
  }

});
