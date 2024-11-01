'use strict';

var wpWordSwitcherScan = function () {
  'use strict';

  function wpWordSwitcherScan() {
    document.querySelectorAll('[data-word-switcher]').forEach(function (el) {
      delete el.dataset.wordSwitcher;

      var words = el.dataset.wordSwitcherWords.split(',').map(Function.prototype.call, String.prototype.trim);
      delete el.dataset.wordSwitcherWords;

      var opts = {};

      var switchDelay = el.dataset.wordSwitcherSwitchdelay;
      if (typeof switchDelay !== 'undefined') {
        delete el.dataset.wordSwitcherSwitchdelay;

        opts.switchDelay = parseInt(switchDelay);

        if (isNaN(opts.switchDelay)) {
          delete opts.switchDelay;
          console.warn('WP Word Switcher: Could not parse `switchDelay` - must be an integer!');
        }
      }

      var random = el.dataset.wordSwitcherRandom;
      if (typeof random !== 'undefined') {
        delete el.dataset.wordSwitcherRandom;

        if (random === 'true') {
          opts.random = true;
        } else if (random === 'false') {
          opts.random = false;
        } else {
          console.warn('WP Word Switcher: Could not parse `random` - must be "true" or "false"!');
        }
      }

      var animationDuration = el.dataset.wordSwitcherAnimationduration;
      if (typeof animationDuration !== 'undefined') {
        delete el.dataset.wordSwitcherAnimationduration;

        if (animationDuration === 'null') {
          opts.animationDuration = null;
        } else {
          opts.animationDuration = parseInt(animationDuration);

          if (isNaN(opts.animationDuration)) {
            delete opts.animationDuration;
            console.warn('WP Word Switcher: Could not parse `animationDuration` - must be "null" or an integer!');
          }
        }
      }

      var className = el.dataset.wordSwitcherClassname;
      if (typeof className !== 'undefined') {
        delete el.dataset.wordSwitcherClassname;

        opts.className = className;
      }

      wordSwitcher(el, words, opts);
    });
  }

  document.addEventListener('DOMContentLoaded', wpWordSwitcherScan);

  return wpWordSwitcherScan;
}();

