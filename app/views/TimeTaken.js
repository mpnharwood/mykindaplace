define([
	'backbone',
	'text!templates/time-taken.html',
	'jquery-ui'
],
	function (Backbone, template) {
		return Backbone.View.extend({
			template: _.template(template),

			initialize: function (options) {
				this.value = options.sliderValue || 0;
				this.render();
			},

			render: function () {
				this.$el.html(this.template())
				this.$('.slider').slider({
					value: this.value,
					min: 0,
					max: 5,
					step: 1,
					slide: _.bind(function (e, ui) {
						this.trigger('slide:timeTaken', ui.value);
						this.trigger('slide', ui.value);
					}, this)
				});
				this.$('.done').click(_.bind(function (e) {
					this.hide();
					e.preventDefault();
					return false;
				}, this))
			},

			show: function () {
				this.$el.show();
				this.$('.menu-2-holder').show();
				this.$el.removeClass('leave');
				this.$el.addClass('enter');
			},

			hide: function () {
				this.$el.removeClass('enter');
				this.$el.hide()
				this.trigger('hide', this.$('input').val())
			}
		});
	});