define(function () {
	return {
		score: function (settings, lsoas) {
			var _lsoas = _.map(lsoas, function (lsoa) {
				return lsoa.attributes
			});
			return this.calcLsoaPrefs(this.calcScores(settings), _lsoas, this.calcLsoaMaxMin(_lsoas))
		},
		calcScores: function (scores) {
			//takes in the scores json data and returns a dictionary with the weighted scores of the important dictionaries

			// get the sum of all the importances
			var sumScores = 0;
			for (var key1 in scores) {
				for (var key2 in scores[key1]) {
					sumScores = sumScores + Math.abs(scores[key1][key2]);
				}
			}
			// divide all scores by the sum
			for (key1 in scores) {
				for (var key2 in scores[key1]) {
					scores[key1][key2] = scores[key1][key2] / sumScores;
				}
			}
			return scores;
		},
		calcLsoaMaxMin: function (lsoas) {
			var lsoa_max_min = {};
			for (var key1 in lsoas[0]) {
				if (key1 == "name" || key1 == "lsoa" || key1 == "position") {
					// do nothing
				} else {
					lsoa_max_min[key1] = {};
					for (var key2 in lsoas[0][key1]) {
						var max = null;
						var min = null;
						lsoa_max_min[key1][key2] = {};
						for (var i = 0; i < lsoas.length; i++) {
							// console.log("i: " + i + "  key1: " + key1 + "  key2: " + key2 + "  value: " + lsoas[i][key1][key2]);
							if (max == null || max < lsoas[i][key1][key2]) {
								max = lsoas[i][key1][key2];
							}
							if (min == null || min > lsoas[i][key1][key2]) {
								min = lsoas[i][key1][key2];
							}
						}
						// console.log(lsoa_max_min);
						lsoa_max_min[key1][key2]["max"] = max * 1.1;
						lsoa_max_min[key1][key2]["min"] = min * 0.9;
					}
				}
			}
			return lsoa_max_min;
		},
		calcLsoaPrefs: function (scores, lsoas, lsoa_MaxMin) {
			// For each key or sub key - age-group 0-9, 10-19
			// calculate a score = abs(preference - lsoa) / (max - min)  // note demographics may be complicated choose 1?
			// normalise all the scores for all the keys
			// multiply importance factor for that key

			// sum all values to give total score
			// divide by the number of scores used to calculate
			// multiply by 100
			var lsoaScore = {};

			for (var i = 0; i < lsoas.length; i++) {
				lsoaScore[lsoas[i].lsoa] = {};

				var total_score = 0;
				for (var key1 in scores) {
					if (key1 == "lsoa" || key1 == "position") {
						// do nothing
					} else {
						lsoaScore[lsoas[i].lsoa][key1] = {};
						for (var key2 in scores[key1]) {
							var lsoa_level = (lsoas[i][key1][key2] - lsoa_MaxMin[key1][key2].min) / (lsoa_MaxMin[key1][key2].max - lsoa_MaxMin[key1][key2].min);  // this returns a value between 0 and 1 for where the lsoa is in the range of lsoas
							var lsoa_score = lsoa_level * (1 - scores[key1][key2]); // calculates the lsoa score, negative preferences reduce the level
							total_score = total_score + lsoa_score;
							lsoaScore[lsoas[i].lsoa][key1][key2] = lsoa_score;
							console.log(lsoas[i].lsoa + " : " + key1 + " : " + key2 + " : score : " + lsoa_score + " : " + total_score + " : ");
						}
						lsoaScore[lsoas[i].lsoa]["total"] = { "total": total_score };
					}
				}

			}
			for (var i = 0; i < lsoas.length; i++) {
				lsoaScore[lsoas[i].lsoa].lsoa = lsoas[i].lsoa;
			}

			// normalise the total_scores to a value between 0 & 100
			var max_totalScores = 0;
			for (key1 in lsoaScore) {
				if (max_totalScores < lsoaScore[key1].total.total) {
					max_totalScores = lsoaScore[key1].total.total
				}
				;
			}
			max_totalScores = max_totalScores * 1.1;
			for (key1 in lsoaScore) {
				lsoaScore[key1].total.total = (lsoaScore[key1].total.total / max_totalScores) * 100;
			}

			// find the keys of the two largest scores and two smallest

			for (var keyLosa in lsoaScore) {
				var min1_score = { "score": null, "key": null };
				var min2_score = { "score": null, "key": null };
				var max1_score = { "score": null, "key": null };
				var max2_score = { "score": null, "key": null };
				for (key1 in lsoaScore[keyLosa]) {
					if (key1 != "total" && key1 !== "lsoa") {
						for (key2 in lsoaScore[keyLosa][key1]) {
							if (max1_score.score == null || max1_score.score < lsoaScore[keyLosa][key1][key2]) {
								max2_score.score = max1_score.score;
								max2_score.key = max1_score.key;
								max1_score.score = lsoaScore[keyLosa][key1][key2];
								if (scores[key1][key2] > 0) {
									max1_score.key = "lots of " + key2;
								} else if (scores[key1][key2] < 0) {
									max1_score.key = "not many " + key2;
								} else {
									max1_score.key = "";
								}
							}
							if (min1_score.score == null || min1_score.score > lsoaScore[keyLosa][key1][key2]) {
								min2_score.score = min1_score.score;
								min2_score.key = min1_score.key;
								;
								min1_score.score = lsoaScore[keyLosa][key1][key2];
								if (scores[key1][key2] > 0) {
									min1_score.key = "not many " + key2;
								} else if (scores[key1][key2] < 0) {
									min1_score.key = "lots of " + key2;
								} else {
									min1_score.key = "";
								}
							}
						}
					}
					lsoaScore[keyLosa]["maxMinScores"] = {
						"min1_score": min1_score,
						"min2_score": min2_score,
						"max1_score": max1_score,
						"max2_score": max2_score
					}
				}
			}

			return lsoaScore;
		}
	};
});