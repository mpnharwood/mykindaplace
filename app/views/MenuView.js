define([
	'backbone',
	'views/TimeTaken',
	'text!templates/menu.html',
	'jquery-ui'
],
	function (Backbone, TimeTaken, template) {
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
						console.log()
					},
					close: function (addr) {
						console.log("goto", addr);
					}
				}
			],

			render: function () {
				this.$el.html(this.template({
					items: this.choices
				}))
//				this.$('.slider').slider(this.sliderOptions)
				this.$el.click(_.bind(function () {
					this.$el.off('animationend webkitAnimationEnd');
					this.$el.hasClass('enter') ? this.hide() : this.show();
				}, this))

				_.each(this.choices, _.bind(function (item) {
					this.$('.' + item.code).click(_.bind(function (e) {
						if (!this[item.code]) {
							this[item.code] = new item.type({
								el: '#second-menu'
							});
							this[item.code].on('slide', _.bind(item.slide, this))
							this[item.code].on('hide', _.bind(function (data) {
								item.close(data);
								this.show();
							}, this))
						}
						this[item.code].show();
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