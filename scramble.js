(function($, window, undefined) {
	$.fn.scramble = function(options) {
		var settings = $.extend({
	            framePerReveal: 2
	        }, options ),

			seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@£$%^&*()":?><}{|~`/.,\\;][=-',
			l = seed.length - 1,
			text = this.text(),
			textArray = text.split(''),
			tl = text.length,
			randomArray = [],
			animating = false,
			that = this,

			getRandomIntInclusive = function(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},

			getRandomStringArray = function() {
				var a = [];
				for (var i = tl - 1; i >= 0; i--) {
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

			animate = function() {
				var output = [];
				randomArray = getRandomStringArray();
				textArray

				for (var i = tl - 1; i >= 0; i--) {
					if (Math.floor(frame / settings.framePerReveal ) > i) {
						output[order[i]] = textArray[order[i]];
					} else {
						output[order[i]] = randomArray[order[i]];
					}
				}

				that.text(output.join(''));

				frame++;
				if (frame < tl * settings.framePerReveal + 1) {
			        requestAnimationFrame(animate);
				} else {
					animating = false;
				}
			},
			order = shuffle( [...Array(tl).keys()] );
			frame = 0,

		this.on('mouseenter', function() {
			if(animating){
				return;
			}
			frame = 0;
			animating = true;

			animate();
		});
	}
}(jQuery, window));
