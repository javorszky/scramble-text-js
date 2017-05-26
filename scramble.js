(function($, window, undefined) {
	$.fn.scramble = function(options) {
		var settings = $.extend({
	            framePerReveal: 2
	        }, options ),
			seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@£$%^&*()":?><}{|~`/.,\\;][=-',
			l = seed.length - 1,
			animate = function(el, j) {

				var output = [];
				randomArrays[j] = getRandomStringArray(tls[j]);

				for (var i = tls[j] - 1; i >= 0; i--) {
					if (Math.floor(frames[j] / settings.framePerReveal ) > i) {
						output[orders[j][i]] = textArrays[j][orders[j][i]];
					} else {
						output[orders[j][i]] = randomArrays[j][orders[j][i]];
					}
				}
				el.text(output.join(''));
			},
			getRandomIntInclusive = function(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			getRandomStringArray = function(n) {
				var a = [];
				for (var i = n - 1; i >= 0; i--) {
					a.push(seed[getRandomIntInclusive(0,l)]);
				}
				return a;
			},
			shuffle = function(array) {
				let counter = array.length;

			    // While there are elements in the array
			    while (counter > 0) {
			        // Pick a random index
			        let index = Math.floor(Math.random() * counter);

			        // Decrease counter by 1
			        counter--;

			        // And swap the last element with it
			        let temp = array[counter];
			        array[counter] = array[index];
			        array[index] = temp;
			    }

			    return array;
			},
			texts = [],
			textArrays = [],
			tls = [],
			randomArrays = [],
			animating = [],
			orders = [],
			frames = [];

		this.each(function(i, el) {

			var e = $(el),
				animThis = function() {
					animate(e, i);
					frames[i]++;
					if (frames[i] < tls[i] * settings.framePerReveal + 1) {
				        requestAnimationFrame(animThis);
					} else {
						animating[i] = false;
					}
				};

			texts[i] = e.text(),
			textArrays[i] = texts[i].split(''),
			tls[i] = texts[i].length,
			randomArrays[i] = [],
			animating[i] = false,
			orders[i] = shuffle( [...Array(tls[i]).keys()] );
			frames[i] = 0;

			e.on('mouseenter', function() {
				if(animating[i]){
					return;
				}
				frames[i] = 0;
				animating[i] = true;

				animThis();
			});
		});
	}
}(jQuery, window));
