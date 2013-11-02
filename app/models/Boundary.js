define([
	'backbone',
	'modules/regular-expressions'
],
	function (Backbone, expr) {

		return Backbone.Model.extend({
			idAttribute: "lsoa",
			initialize: function (options) {
				this.set('coords', options.coords);
			}

		});

	});