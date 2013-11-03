define([
	'backbone',
	'views/BigOptions',
	'modules/colourFromPercent',
	'text!templates/age.html',
	'jquery-ui'
],
	function (Backbone, BigOptions, colourFromPercent, template) {
		return BigOptions.extend({
			template: _.template(template),

			sliderOptions: {
				min: -2,
				max: 2,
				slide: function (e, ui) {
					if (ui.value !== 0) {
						$(e.target).css('background', colourFromPercent(100 - (ui.value + 5) * 10));
					}
					else {
						$(e.target).css('background', '');
					}
				}
			}

		});
	});