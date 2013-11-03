define(function () {
		return function (percent) {
			function numToHex(num) {
				var red = num.toString(16);
				return (red.length == 1) ? '0' + red : red;
			}

			percent--;

			if (percent < 50) {
				// green to yellow
				$r = Math.floor(255 * (percent / 50));
				$g = 255;

			} else {
				// yellow to red
				$r = 255;
				$g = Math.floor(255 * ((50 - percent % 50) / 50));
			}
			$b = 0;

			return "#" + numToHex($r) + numToHex($g) + numToHex($b);
		};
	}
);