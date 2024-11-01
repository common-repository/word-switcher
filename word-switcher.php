<?php
/**
 * PHP Version 7.1
 *
 * @category Plugin_File
 * @package  WPWordSwitcher
 * @author   Bilal Akil <mail@bilalakil.me>
 * @license  https://opensource.org/licenses/MIT The MIT License
 * @link     https://wordpress.org/plugins/word-switcher/
 */
/**
Plugin Name: Word Switcher
Plugin URI: https://wordpress.org/plugins/word-switcher/
@codingStandardsIgnoreStart
Description: Enables the usage of the Word Switcher NPM module and a [word-switcher] shortcode! Bring your own animations - it's as easy as adding a couple of lines of CSS in the Customizer.
@codingStandardsIgnoreEnd
Version: 0.1.0
Author: Bilal Akil <mail@bilalakil.me>
Author URI: http://www.bilalakil.me/
License: MIT
 */

if (!function_exists('add_action') ) {
    echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
    exit;
}

define('WORD_SWITCHER__VERSION', '0.1.0');

define('WORD_SWITCHER__PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WORD_SWITCHER__PLUGIN_URL', plugin_dir_url(__FILE__));

require_once WORD_SWITCHER__PLUGIN_DIR . 'class.word-switcher.php';

add_action('init', array('WordSwitcher', 'init'));
