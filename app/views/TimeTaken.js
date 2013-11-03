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
			}

		});
	});