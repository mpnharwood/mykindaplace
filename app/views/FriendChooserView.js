define([
	'backbone',
	'text!templates/FriendChooserView.html'
],
	function (Backbone, template) {
		return Backbone.View.extend({
			template: _.template(template),

			initialize: function (options) {

			},

			render: function () {
				this.$el.html(this.template())
			}
		});
	});