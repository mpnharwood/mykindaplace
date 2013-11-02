define([
	'backbone'
],
	function (Backbone) {
		return Backbone.Model.extend({
			get: function (key) {
				if (key && this.lazyFields) {
					var getter = this.lazyFields[key];
					if (getter) {
						this.set(key, getter.call(this));
						this.lazyFields = _.omit(this.lazyFields, key);
					}
				}
				return Backbone.Model.prototype.get.apply(this, arguments);
			}
		});
	});