define(function (require, exports, module) {
	"use strict";

	// External dependencies.
	var Backbone = require("backbone");
	var MapsView = require('views/MapView');
	var MenuView = require('views/MenuView');

	// Defining the application router.
	module.exports = Backbone.Router.extend({
		routes: {
			"": "map",
			":menu": "menu"
		},

		index: function () {
			console.log("Welcome to your / route.");

		},

		map: function () {
			var view = new MapsView({el: '#main'});
			if (!this.menuView) {
				this.menuView = new MenuView({el: '#menu'});
			}
			this.menuView.show();
		},

		menu: function () {
			if (!this.menuView) {
				this.menuView = new MenuView({el: '#menu'});
			}
			this.menuView.show();
		}

	});
});
