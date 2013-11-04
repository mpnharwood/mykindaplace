define([
	'backbone',
	'views/TimeTaken',
	'views/Age',
	'views/Ethnicity',
	'views/Qualifications',
	'views/Language',
	'views/Marriage',
	'models/SlideSettings',
	'modules/Scorer',
	'text!templates/menu.html',
	'jquery-ui'
],
	function (Backbone, TimeTaken, Age, Ethnicity, Qualifications, Language, Marriage, SlideSettings, Scorer, template) {
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
						this.settings.innerSet('travel_time', "duration", e.value);
					}
				},
				{
					name: 'Age',
					code: 'age',
					type: Age,
					slide: function (val) {
						this.settings.innerSet('age_group', val.name, val.value);
					},
					close: $.noop
				},
				{
					name: 'Ethnicity',
					code: 'ethnic-group',
					type: Ethnicity,
					slide: function (val) {
						this.settings.innerSet('ethnicity', val.name, val.value);
					},
					close: function () {
						this.rescore();
					}
				},
				{
					name: 'Qualifications',
					code: 'qualification',
					type: Qualifications,
					slide: function (val) {
						this.settings.innerSet('qualifications', val.name, val.value);
					},
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
					type: Language,
					slide: function (val) {
						this.settings.innerSet('language', val.name, val.value);
					},
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
					name: 'Marriage',
					code: 'marriage',
					type: Marriage,
					slide: function (val) {
						this.settings.innerSet('marital-status', val.name, val.value);
					},
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
							item.view.on('slide', _.bind(this.rescore, this))
							item.view.on('hide', _.bind(function (data) {
								_.bind(item.close || item.view.close, this)(data);
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

			rescore: function () {
				var scores = Scorer.score(this.settings.attributes, this.lsoas.models);
				_.each(scores, _.bind(function (score) {
					this.lsoas.get(score.lsoa).score = score.total.total;
				}, this));
				this.trigger('scored', scores);
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