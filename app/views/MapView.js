define([
	'backbone',
	'collections/Locality',
	'text!templates/map.html'
],
	function (Backbone, Locality, template) {
		return Backbone.View.extend({
			initialize: function (options) {
				_.bindAll(this, 'render', 'drawArea');
				this.bounds = new Locality();
				this.bounds.on("sync", this.render)
				this.bounds.fetch();
			},

			render: function () {
				var mapOptions = {
					zoom: 12,
					center: new google.maps.LatLng(52.202544, 0.131237),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoomControl: false,
					panControl: false,
					streetViewControl: true,
					streetViewControlOptions: {
						position: google.maps.ControlPosition.RIGHT_BOTTOM
					}
				};
				this.map = new google.maps.Map(this.el,
					mapOptions);
				var getcol = function () {
					return (Math.random() > 0.5) ? '#ff7c11' : '#00ff00'
				};
				_.each(this.bounds.models, _.bind(function (bound) {
					this.drawArea(bound, getcol());
				}, this))
			},

			drawArea: function (boundary, colour) {
				var poly_coords = boundary.get("coords");
				var googleMapPoly = [];
				for (var p = 0; p < poly_coords.length; p++) {
					googleMapPoly.push(new google.maps.LatLng(poly_coords[p].lat, poly_coords[p].lng));
				}
				if (googleMapPoly.length > 0) {
					var poly = new google.maps.Polygon({
						path: googleMapPoly,
						strokeColor: colour,
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: colour,
						fillOpacity: 0.35
					});
					poly.setMap(this.map);
					boundary.set('poly', poly);
				}
			}
		});
	});