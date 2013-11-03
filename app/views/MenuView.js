define([
	'backbone',
	'views/TimeTaken',
	'views/Age',
	'models/SlideSettings',
	'text!templates/menu.html',
	'jquery-ui'
],
	function (Backbone, TimeTaken, Age, SlideSettings, template) {
		return Backbone.View.extend({
			template: _.template(template),

			initialize: function (options) {
				this.lsoas = options.lsoas;
				this.settings = new SlideSettings({});
				this.render();
			},

			choices: [
				{
					name: 'Travel Time',
					code: 'travel-time',
					type: TimeTaken,
					slide: function (e) {
						if (this.settings.get('travel_time').duration !== e.value) {
							this.settings.set('travel_time', {
								"duration": e.value// values between 0 to 1
							})
						}
					},
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
				},
				{
					name: 'Age',
					code: 'age',
					type: Age,
					slide: function (val) {
						console.log(val)
					},
					close: $.noop
				},
				{
					name: 'Air Quality',
					code: 'air-quality',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				},
				{
					name: 'Crime',
					code: 'crime',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				},
				{
					name: 'Greenery',
					code: 'greenery',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				},
				{
					name: 'Language',
					code: 'language',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				},
				{
					name: 'House prices',
					code: 'price-of-house',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				},
				{
					name: 'Salary',
					code: 'salary',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				},
				{
					name: 'Qualifications',
					code: 'qualification',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				},
				{
					name: 'Marriage',
					code: 'marriage',
					type: TimeTaken,
					slide: $.noop,
					close: $.noop
				}
			],

			render: function () {
				this.$el.html(this.template({
					items: this.choices
				}))
//				this.$('.slider').slider(this.sliderOptions)
				this.$el.click(_.bind(function () {
					this.$el.off('animationend webkitAnimationEnd');
					this.$el.hasClass('enter') || this.show();
				}, this))

				_.each(this.choices, _.bind(function (item) {
					this.$('.' + item.code).click(_.bind(function (e) {
						if (!item.view) {
							item.view = new item.type({});
							$('body').append(item.view.$el)
							item.view.on('slide', _.bind(item.slide, this))
							item.view.on('hide', _.bind(function (data) {
								_.bind(item.close, this)(data);
								this.show();
							}, this))
						}
						item.view.show();
						this.hide();
						e.preventDefault();
						return false;
					}, this))
				}, this))
			},

			show: function () {
				this.$el.show();
				this.$('.menu-holder').show();
				this.$el.removeClass('leave');
				this.$el.addClass('enter');
			},

			hide: function () {
				this.$el.removeClass('enter');
				this.$el.addClass('leave');
				this.$el.one('animationend webkitAnimationEnd', function (e) {
					$(e.delegateTarget).find('.menu-holder').hide()
				})
			},

			distanceCallbackOne: function (response) {
				_.each(response.rows[0].elements, _.bind(function (val, index) {
					this.lsoas.at(index).set('timeTaken', val.duration.value);
				}, this))
			},

			distanceCallbackTwo: function (response) {
				_.each(response.rows[0].elements, _.bind(function (val, index) {
					this.lsoas.at(index + 24).set('timeTaken', val.duration.value);
				}, this))
			},

			distanceCallbackThree: function (response) {
				_.each(response.rows[0].elements, _.bind(function (val, index) {
					this.lsoas.at(index + 48).set('timeTaken', val.duration.value);
				}, this))
			}
		});
	});