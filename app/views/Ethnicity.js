define([
	'backbone',
	'views/BigOptions',
	'modules/colourFromPercent',
	'text!templates/ethnicity.html',
	'jquery-ui'
],
	function (Backbone, BigOptions, colourFromPercent, template) {
		return BigOptions.extend({
			template: _.template(template)

		});
	});