define([
	'backbone',
	'text!templates/menu.html',
	'jquery-ui'
],
	function (Backbone, template) {
		return Backbone.View.extend({
			template: _.template(template),

			initialize: function (options) {
				this.render();
			},

			sliderOptions: {
				value: 0,
				min: 0,
				max: 5,
				step: 1,
				slide: function (e, ui) {
					console.log(ui.value)
					console.log(ui)
				}
			},

			render: function () {
				this.$el.html(this.template())
				this.$('.slider').slider(this.sliderOptions)
				this.$el.click(_.bind(function () {
					this.$el.off('animationend webkitAnimationEnd');
					this.$el.hasClass('enter') ? this.hide() : this.show();
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
				this.$el.on('animationend webkitAnimationEnd', function (e) {
					$(e.delegateTarget).find('.menu-holder').hide()
				})
			}
		});
	});