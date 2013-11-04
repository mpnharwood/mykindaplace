define([
	'backbone'
],
	function (Backbone) {
		return Backbone.Model.extend({
			defaults: {
				"travel_time": {
					"duration": 0// values between 0 to 1
				},
				"age_group": {
					"0-9": 0, // values between -1 to 1
					"10-19": 0, // values between -1 to 1
					"20-40": 0, // values between -1 to 1
					"40+": 0 // values between -1 to 1
				},
				"ethnicity": {
					"mixed": 0, // values between 0 to 1
					"black": 0, // values between 0 to 1
					"asian": 0 // values between 0 to 1
				},
				"qualifications": {
					"degree": 0, // values between -1 to 1
					"alevel": 0 // values between -1 to 1
				},
				"language": {
					"Fr_por_spa": 0, // values between 0 to 1
					"Ara_pun_urd": 0, // values between 0 to 1
					"chinese": 0, // values between 0 to 1
					"E_europe": 0 // values between 0 to 1
				},
				"marital_status": {
					"single": 0, // values between -1 to 1
					"married": 0.0 // values between -1 to 1
				},
				"employment": {
					"employed": 0, // values between -1 to 1
					"unemployed": 0, // values between -1 to 1
					"retired": 0 // values between -1 to 1
				},
				"education": {
					"school_quality": 0 // values between 0 to 1
				},
				"crime": {
					"crime_level": 0 // values between 0 to 1
				},
				"social_status": {
					"upper_middle": 0, // values between -1 to 1
					"lower_middle": 0, // values between -1 to 1
					"skilled": 0, // values between -1 to 1
					"working": 0 // values between -1 to 1
				},
				"greenery": {
					"green": 0, // values between -1 to 1
					"grey": 0 // values between -1 to 1
				}

			},

			innerSet: function (attr, prop, val) {
				if (this.get(attr)[prop] === val) return;
				this.get(attr)[prop] = val;
				this.trigger('change:' + attr);
			}
		});
	});