define([
	'backbone'
],
	function (Backbone) {
		return Backbone.Model.extend({
			nameOrMe: function (myId, meString) {
				if (this.get('id') == myId) return meString
				return this.get('name')
			}
		});
	});