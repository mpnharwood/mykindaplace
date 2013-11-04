define([
	'backbone',
	'views/BigOptions',
	'text!templates/time-taken.html',
	'jquery-ui'
],
	function (Backbone, BigOptions, template) {
		return BigOptions.extend({
			template: _.template(template),

			initialize: function (options) {
				this.value = options.sliderValue || 0;
				BigOptions.prototype.initialize.call(this);
			},

			//Runs under MenuView scope
			close: function ($button) {
				var method = google.maps.TravelMode[$button.data('transport')];
				var origins = [ $button.parent().find('input').val() ];
				var destinations = _.map(this.lsoas.models, function (model) {
					return new google.maps.LatLng(model.get('coords')[10].lat, model.get('coords')[10].lng);
				})
				var service = new google.maps.DistanceMatrixService();
				service.getDistanceMatrix(
					{
						origins: origins,
						destinations: destinations.slice(0, 24),
						travelMode: method,
						avoidHighways: false,
						avoidTolls: false
					}, _.bind(this.distanceCallbackOne, this));
				service.getDistanceMatrix(
					{
						origins: origins,
						destinations: destinations.slice(24, 48),
						travelMode: method,
						avoidHighways: false,
						avoidTolls: false
					}, _.bind(this.distanceCallbackTwo, this));
				service.getDistanceMatrix(
					{
						origins: origins,
						destinations: destinations.slice(48),
						travelMode: method,
						avoidHighways: false,
						avoidTolls: false
					}, _.bind(this.distanceCallbackThree, this));
			}

		});
	});