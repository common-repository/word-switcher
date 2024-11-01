=== Word Switcher ===
Contributors: bilalakil
Tags: shortcode, word-switcher, animation, transition, effects, words, loop
Requires at least: 3.0.0
Tested up to: 4.9.1
Stable tag: 0.1.1
License: MIT

Enables the usage of the Word Switcher NPM module and a [word-switcher] shortcode! Bring your own animations - it's as easy as adding a couple of lines of CSS in the Customizer.

== Description ==
This plugin facilitates the usage of this Word Switcher JavaScript tool: https://bitbucket.org/bilalakil/word-switcher

It creates a [word-switcher] shortcode where you can specify values for the tool's parameters and, of course, the words themselves, along with a fallback value to be displayed while the tool is being loaded or if it fails to load. When the page is loaded the fallback content will be replaced with a word switcher.

Bring your own animations - it's as easy as adding a couple of lines of CSS in the Customizer. It also adds the `wordSwitcher` JavaScript function to the global scope so you can do whatever you like with it.

Full usage example:

<pre>
Hello [word-switcher words="world, people, friends, everybody, mate" switchDelay="1000" random="true" animationDuration="null" className="hello-world-switcher"]world[/word-switcher]
</pre>

This can be accompanied by the following CSS (which you can insert straight into the Customizer) to simply fade the switching words in and out:

<pre>
.hello-world-switcher-enter-active, .hello-world-switcher-leave-active {
  transition: opacity 1s
}
.hello-world-switcher-enter, .hello-world-switcher-leave-to {
  opacity: 0
}
</pre>

Read the JavaScript tool's documentation for more information regarding the parameters and their default values, and how to use the animation classes (as inspired and imitated from the awesome Vue.js).

== Changelog ==
= 0.1.1 =
* Removed the non-transpiled JavaScript file from the plugin.

= 0.1.0 =
* First release!
* Using word-switcher v0.1.2 from npm.
