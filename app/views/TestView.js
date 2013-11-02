define([
	'backbone',
	'collections/BirthdayTimeline',
	'views/NamesView',
	'text!templates/test.html'
],
	function (Backbone, Timeline, NamesView, template) {
		return Backbone.View.extend({
			template: _.template(template),

			initialize: function (options) {
				_.bindAll(this, 'render', 'sync')
				this.timeline = new Timeline();
				this.timeline.on("sync", this.sync)
				this.timeline.fetch();
			},

			sync: function () {
				this.render()
				if (!this.namesView) {
					this.namesView = new NamesView({
						collection: this.timeline,
						el: this.$('.putaka')
					})
				}
			},

			render: function () {
				this.$el.html(this.template({
					posts: this.timeline
				}))
			}
		});
	});