<?php
/**
 * PHP Version 7.1
 *
 * @category File
 * @package  WordSwitcher
 * @author   Bilal Akil <mail@bilalakil.me>
 * @license  https://opensource.org/licenses/MIT The MIT License
 * @link     https://wordpress.org/plugins/word-switcher/
 */

/**
 * The WordSwitcher class provides only static methods.
 * The `init` function should be executed as per the `init` action.
 * Other methods have been made public only to function as hooks.
 *
 * PHP Version 7.1
 *
 * @category Class
 * @package  WordSwitcher
 * @author   Bilal Akil <mail@bilalakil.me>
 * @license  https://opensource.org/licenses/MIT The MIT License
 * @link     https://wordpress.org/plugins/word-switcher/
 */
class WordSwitcher
{
    // This script is injected with the shortcode to kick of the scanner.
    // Useful especially for AJAX loaded content.
    private static $_script = "<script>
    if(typeof wpWordSwitcherScan !== 'undefined') { wpWordSwitcherScan(); }
</script>";

    private static $_initiated = false;

    /**
     * One-time-use initiation.
     *
     * @return null
     */ 
    public static function init() 
    {
        if (!self::$_initiated ) {
            self::$_initiated = true;

            if (is_admin() ) {
                return; 
            }

            add_action(
                'wp_enqueue_scripts',
                array('WordSwitcher', 'enqueueScripts')
            );
            add_shortcode(
                'word-switcher',
                array('WordSwitcher', 'wordSwitcherShortcode')
            );
        }
    }

    /**
     * Hooked from `self::init_hooks`.
     *
     * @return null
     */
    public static function enqueueScripts() 
    {
        $npm_dir = 'node_modules/word-switcher/';
        $npm_package_json = json_decode(
            file_get_contents(
                WORD_SWITCHER__PLUGIN_DIR . $npm_dir . 'package.json'
            )
        );

        wp_enqueue_script(
            'word-switcher',
            WORD_SWITCHER__PLUGIN_URL . 'dist/npm/word-switcher.js',
            array(), // $deps
            $npm_package_json->version,
            true // $in_footer
        );
        wp_enqueue_script(
            'wp-word-switcher',
            WORD_SWITCHER__PLUGIN_URL . 'dist/word-switcher.js',
            array('word-switcher'), // $deps
            WORD_SWITCHER__VERSION,
            true // $in_footer
        );
    }

    /**
     * Hooked (shortcode) from `self::init_hooks`.
     *
     * @param object $atts    Shortcode attributes object.
     *                        The keys considered are `words`, `switchDelay`,
     *                        `random`, `animationDuration` and `className`.
     * @param string $content Shortcode content, to be used as a placeholder.
     *
     * @return string
     */
    public static function wordSwitcherShortcode( $atts, $content ) 
    {
        $allowed_atts = [
            'words', 'switchDelay', 'random',
            'animationDuration', 'className'
        ];
        $atts_str = 'data-word-switcher ';
    
        foreach ( $allowed_atts as $att ) {
            $l_att = strtolower($att);

            if (array_key_exists($l_att, $atts) ) {
                $atts_str .= "data-word-switcher-$att=\"${atts[$l_att]}\"";
            }
        }

        return "<span $atts_str>$content</span>" . self::$_script;
    }
}
