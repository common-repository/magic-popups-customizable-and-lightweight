<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @since      1.0.0
 *
 * @package    Magic_Popups
 * @subpackage Magic_Popups/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Magic_Popups
 * @subpackage Magic_Popups/public
 * @author     Your Name <mattfletcher94@outlook.com>
 */
class Magic_Popups_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/magic-popups-public.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		// Get popups
		$popups = get_option('magic_popups_popups', array());

		// Enqueue scripts
		wp_enqueue_script($this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/magic-popups-public.js', array('jquery'), $this->version, true);
		
		// Loop through popups and do shortcodes
		for ($i = 0 ; $i < count($popups) ; $i++) {
			$popups[$i]->content = do_shortcode($popups[$i]->content);
		}
		
		// Localize plugin options
		wp_localize_script($this->plugin_name, 'magic_popups', array(
			'popups' => $popups,
			'page_id' => get_the_ID(),
			'is_logged_in' => is_user_logged_in(),
		));

	}

}
