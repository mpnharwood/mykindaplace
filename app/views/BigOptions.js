define([
	'backbone',
	'jquery-ui'
],
	function (Backbone, template) {
		return Backbone.View.extend({

			sliderOptions: {},
			tagName: 'menu',
			className: 'second-menu',

			initialize: function () {
				this.sliderOptions = _.defaults(this.sliderOptions, {
					value: 0,
					min: 0,
					max: 1,
					step: 0.2,
					change: _.bind(function (e, ui) {
						this.trigger('slide', {
							value: ui.value,
							name: $(e.target).data('key'),
							element: $(e.target)
						});
					}, this)
				});
				this.render();
			},

			render: function () {
				this.$el.html(this.template())
				this.$('.slider').slider(this.sliderOptions);
				this.$('.done').click(_.bind(function (e) {
					this.hide();
					this.trigger('hide', $(e.target))
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
			}
		});
	});