define(function (require, exports, module) {
	"use strict";

	// External dependencies.
	var Backbone = require("backbone");
	var MapsView = require('views/MapView');

	// Defining the application router.
	module.exports = Backbone.Router.extend({
		routes: {
			"": "index",
			":map": "map"
		},

		index: function () {
			console.log("Welcome to your / route.");

		},

		map: function () {
			var view = new MapsView({el: '#main'});
		}

	});
});
