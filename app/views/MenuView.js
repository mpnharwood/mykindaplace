define([
	'backbone',
	'views/TimeTaken',
	'views/Age',
	'text!templates/menu.html',
	'jquery-ui'
],
	function (Backbone, TimeTaken, Age, template) {
		return Backbone.View.extend({
			template: _.template(template),

			initialize: function (options) {
				this.render();
			},

			choices: [
				{
					name: 'Travel Time',
					code: 'travel-time',
					type: TimeTaken,
					slide: function (val) {
						console.log(val)
					},
					close: function (addr) {
						console.log("goto", addr);
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
								item.close(data);
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
			}
		});
	});