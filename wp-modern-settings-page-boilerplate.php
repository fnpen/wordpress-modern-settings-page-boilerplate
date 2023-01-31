<?php
/**
 * Plugin Name:       Modern Settings Page Boilerplate for WordPress
 * Plugin URI:        https://github.com/fnpen/wp-modern-settings-page-boilerplate
 * Description:       Example plugin of using Gutenberg components for creating your own settings page.
 *
 * Text Domain:       wp-modern-settings-page-boilerplate
 * Domain Path:       /languages
 *
 * Author:            Ilya Zolotov
 * Author URI:        https://ilyazolotov.com/
 *
 * Version:           0.0.1
 * Requires at least: 5.8
 * Tested up to:      6.1.1
 * Requires PHP:      7.1
 */

namespace ModernSettingsPageBoilerplate;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MODERN_SETTINGS_PATH', \plugin_dir_path( __FILE__ ) );
define( 'MODERN_SETTINGS_URL', \plugins_url( '/', __FILE__ ) );
define( 'MODERN_SETTINGS_PLUGIN_FILE', __FILE__ );
define( 'MODERN_SETTINGS_PLUGIN_DIR', __DIR__ );
define( 'MODERN_SETTINGS_VERSION', '0.0.1' );

require 'includes/utils/register-ajax-method.php';
require 'includes/utils/enqueue-scripts-from-asset-file.php';
require 'includes/admin-page.php';
require 'includes/ajax.php';

add_filter(
	'modern_settings_variables',
	function( $variables ) {
		$variables['notice_hidden'] = get_option( 'modern-settings/notice_hidden', false );
		$variables['simple_form'] = get_option( 'modern-settings/simple_form', [] );
		$variables['repeated_form'] = get_option( 'modern-settings/repeated_form', [] );

		return $variables;
	}
);

