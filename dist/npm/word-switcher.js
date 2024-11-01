'use strict';

var wordSwitcher = function () {
  'use strict';

  var defaultOptions = {
    switchDelay: 3000,
    animationDuration: 0,
    random: false,
    className: 'word-switcher'
  };

  function wordSwitcher(target, words, opts) {
    if (words.length <= 1) {
      return;
    }

    var animateWord = function animateWord() {
      if (opts.random) {
        var preRandom = curWord;

        while (preRandom === curWord) {
          curWord = parseInt(Math.random() * words.length);
        }
      } else {
        curWord = (curWord + 1) % words.length;
      }

      var span = document.createElement('span');
      span.innerHTML = words[curWord];
      span.classList.add(opts.className);

      if (opts.animationDuration !== 0) {
        if (opts.animationDuration === null) {
          span.addEventListener('transitionend', endAnimation(span));
          span.addEventListener('animationend', endAnimation(span));
        } else {
          setTimeout(startAnimation(span, 'leave'), opts.switchDelay + opts.animationDuration);
        }

        startAnimation(span, 'enter')();
      }

      while (target.firstChild) {
        target.removeChild(target.firstChild);
      }
      target.appendChild(span);

      if (opts.animationDuration !== null) {
        setTimeout(function () {
          requestAnimationFrame(animateWord);
        }, opts.switchDelay + opts.animationDuration * 2);
      }
    };

    var startAnimation = function startAnimation(span, type) {
      return function () {
        span.classList.add(opts.className + '-' + type);
        span.classList.add(opts.className + '-' + type + '-active');

        requestAnimationFrame(function () {
          if (type === 'enter') {
            // Can't find a better way at the moment.
            // Without waiting two frames the enter class doesn't have a chance,
            // which stuffs up opacity transitions (and probably others).
            requestAnimationFrame(animationEntered(span));
          } else {
            animationEntered(span)();
          }
        });

        if (opts.animationDuration !== null) {
          setTimeout(endAnimation(span), opts.animationDuration);
        }
      };
    };

    var animationEntered = function animationEntered(span) {
      return function () {
        if (span.classList.contains(opts.className + '-enter-active')) {
          span.classList.remove(opts.className + '-enter');
          span.classList.add(opts.className + '-enter-to');
        } else {
          span.classList.remove(opts.className + '-leave');
          span.classList.add(opts.className + '-leave-to');
        }
      };
    };

    var endAnimation = function endAnimation(span) {
      return function () {
        if (span.classList.contains(opts.className + '-enter-active')) {
          span.classList.remove(opts.className + '-enter-active');
          span.classList.remove(opts.className + '-enter-to');

          setTimeout(startAnimation(span, 'leave'), opts.switchDelay);
        } else {
          span.classList.remove(opts.className + '-leave-active');
          span.classList.remove(opts.className + '-leave-to');

          animateWord();
        }
      };
    };

    opts = Object.assign(Object.assign({}, defaultOptions), opts || {});
    var curWord = -1;

    requestAnimationFrame(animateWord);
  }

  return wordSwitcher;
}();

