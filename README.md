<script
  type="application/javascript"
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
  crossorigin="anonymous"></script>
<script type="application/javascript" src="https://raw.githubusercontent.com/javorszky/scramble-text-js/master/scramble.js"></script>

# scramble-text-js
A library that scrambles a text and over some time gradually unscrambles it.

## Dependencies

* jQuery. Technically any version that supports creating plugins (`jQuery.fn.yournamehere = function()`).
* Uh, ES6 I think? Because I think I may have used that syntax copied from Stack Overflow

## How to use

### Quickstart
Given the following markup:

```html
<p class="scramble">Scramble mi timbers!</p>
```
In your js file, do this after you have access to jQuery:
```js
$('.scramble').scramble();
```

### Options

```js
$('.scramble').scramble({framePerReveal: 3});
```

| option name | What does it do? |
|--------- | --------- |
|`framesPerReveal`| how many frames it takes for the next character to be revealed / fixed. Takes a float. Lower the number, the quicker the unscramble.


### When does this happen?

By default, on `mouseenter`. That's automatically attached. I should probably unattach it from there, but for demo purposes, it's good enough.

It also uses `requestAnimationFrame`. Guards against attaching the unscramble again to the element before the previous one is finished.

## Who made it?

Me. [@javorszky](https://twitter.com/javorszky) on the twitter dot com website

## But why?

Because in 2006 I made a thing in Flash and wanted to recreate it in Javascript.

## Things to be aware of

Best works with a monospaced font. Don't use on large bodies of text, or multiple paragraphs, unless you hate your batter / CPU.

## DEMO

<p class="scramble" style="font-family: Courier;">Hover over me to scramble and unscramble!</p>

<script>
	(function($,window,undefined) {
		$(document).ready(function() {
			$('.scramble').scramble({framePerReveal: 0.2});
		});
	}(jQuery,window));
</script>
