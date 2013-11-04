define([
	'backbone'
],
	function (Backbone) {

		return Backbone.Model.extend({
			idAttribute: "lsoa",

			initialize: function (options) {
				this.set('coords', options.coords);
			}

		});

	});