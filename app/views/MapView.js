define([
	'backbone',
	'collections/Locality',
	'views/MenuView',
	'modules/colourFromPercent',
	'text!templates/map.html'
],
	function (Backbone, Locality, MenuView, colourFromPercent, template) {
		return Backbone.View.extend({
			initialize: function (options) {
				_.bindAll(this, 'render', 'drawArea');
				this.bounds = new Locality();
				this.bounds.on("sync", this.render)
				this.bounds.fetch();
			},

			render: function () {
				var mapOptions = {
					zoom: 13,
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
				_.each(this.bounds.models, _.bind(function (bound) {
					this.drawArea(bound, Math.random() * 100);
				}, this))

				if (!this.menuView) {
					this.menuView = new MenuView({el: '#menu', lsoas: this.bounds});
					this.menuView.show();
					this.menuView.on('scored', _.bind(function () {
						_.each(this.bounds.models, _.bind(function (lsoa) {
							lsoa.get('poly').setOptions({
								fillColor: colourFromPercent(lsoa.score)
							})
						}, this));
					}, this));
				}
			},

			drawArea: function (boundary, score) {
				var poly_coords = boundary.get("coords");
				var googleMapPoly = [];
				for (var p = 0; p < poly_coords.length; p++) {
					googleMapPoly.push(new google.maps.LatLng(poly_coords[p].lat, poly_coords[p].lng));
				}
				if (googleMapPoly.length > 0) {
					var poly = new google.maps.Polygon({
						path: googleMapPoly,
						strokeColor: '#ff7c11',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: colourFromPercent(score),
						fillOpacity: 0.35
					});
					poly.setMap(this.map);
					google.maps.event.addListener(poly, 'click', function (event) {
						console.log(boundary.get("lsoa"));
					});
					boundary.set('poly', poly);
				}
			}
		});
	});