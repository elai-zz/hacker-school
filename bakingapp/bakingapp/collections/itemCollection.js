var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Item = require('../models/item');

module.exports = Backbone.Collection.extend({
	  
	model: Item,
	url: "/items"

});