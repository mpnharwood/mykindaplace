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
				min: -1,
				max: 1,
				step: 0.5,
				slide: function (e, ui) {
					if (ui.value !== 0) {
						$(e.target).css('background', colourFromPercent(100 - (ui.value + 1) * 50));
					}
					else {
						$(e.target).css('background', '');
					}
				}
			}

		});
	});