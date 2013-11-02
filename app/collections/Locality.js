define([
	'backbone',
	'models/Boundary'
],
	function (Backbone, Boundary) {
		return Backbone.Collection.extend({
			url: 'app/dev_resources/kml_full.json',
			model: Boundary,
			parse: function (response) {
				return _.map(response, function (coords, lsoa) {
					return new Boundary({
						lsoa: lsoa,
						coords: coords
					});
				});
			}
		});
	})