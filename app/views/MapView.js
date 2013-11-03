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
				_.each(this.bounds.models, _.bind(function (bound) {
					this.drawArea(bound, Math.random() * 100);
				}, this))
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
						fillColor: this.colour(score),
						fillOpacity: 0.35
					});
					poly.setMap(this.map);
					boundary.set('poly', poly);
				}
			},

			colour: function (percent) {
				function numToHex(num) {
					var red = num.toString(16);
					return (red.length == 1) ? '0' + red : red;
				}

				percent--; // working with 0-99 will be easier

				if (percent < 50) {
					// green to yellow
					$r = Math.floor(255 * (percent / 50));
					$g = 255;

				} else {
					// yellow to red
					$r = 255;
					$g = Math.floor(255 * ((50 - percent % 50) / 50));
				}
				$b = 0;

				return "#" + numToHex($r) + numToHex($g) + numToHex($b);
			}
		});
	});