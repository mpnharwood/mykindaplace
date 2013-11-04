define([
	'backbone',
	'models/Boundary',
	'text!dev_resources/convertedJSON.json'
],
	function (Backbone, Boundary, extra_data) {
		return Backbone.Collection.extend({
			url: 'app/dev_resources/kml_full.json',
			model: Boundary,
			parse: function (response) {
				var extras = JSON.parse(extra_data);
				return _.map(response, function (coords, lsoa) {
					var bound = new Boundary({
						lsoa: lsoa,
						coords: coords,
						travel_time: {
							"duration": 100000
						}
					});
					bound.set(_.findWhere(extras, {'lsoa': lsoa}));
					return bound;
				});
			}
		});
	})