define([
	'backbone',
	'views/BigOptions',
	'text!templates/language.html',
	'jquery-ui'
],
	function (Backbone, BigOptions, template) {
		return BigOptions.extend({
			template: _.template(template)

		});
	});