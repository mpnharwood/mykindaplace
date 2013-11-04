define([
	'backbone',
	'views/BigOptions',
	'text!templates/marriage.html',
	'jquery-ui'
],
	function (Backbone, BigOptions, template) {
		return BigOptions.extend({
			template: _.template(template)

		});
	});