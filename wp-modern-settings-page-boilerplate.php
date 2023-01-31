<?php
/**
 * Plugin Name:       Modern Settings Page Boilerplate for WordPress
 * Plugin URI:
 * Description:
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

add_filter(
	'modern_settings_variables',
	function( $variables ) {
		$variables['notice_hidden'] = get_option( 'modern-settings/notice_hidden', false );
		$variables['simple_form'] = get_option( 'modern-settings/simple_form', [] );
		$variables['repeated_form'] = get_option( 'modern-settings/repeated_form', [] );

		return $variables;
	}
);


register_ajax_method(
	'modern-settings/hide-notice',
	function() {
		update_option( 'modern-settings/notice_hidden', true );

		return true;
	}
);

register_ajax_method(
	'modern-settings/simple_form-save',
	function() {
		$name = sanitize_text_field( $_POST['name'] );
		$description = sanitize_text_field( $_POST['description'] );
		$throwError = $_POST['throwError'] === 'true';

		if( true === $throwError ) {
			throw new \Exception( __( 'You checked the checkbox. Server error', 'wp-modern-settings-page-boilerplate' ) );
		}

		sleep(1);

		$data = [
			'name' => $name,
			'description' => $description,
		];

		update_option( 'modern-settings/simple_form', $data );

		return $data;
	}
);

register_ajax_method(
	'modern-settings/repeated_form-save',
	function() {
		$name = sanitize_text_field( $_POST['name'] );
		$items = $_POST['items'];

		if( ! is_array( $items ) ) {
			$items = [];
		}

		foreach( $items as &$item ) {
			$item['title'] = sanitize_text_field( $item['title'] );
			$item['description'] = sanitize_text_field( $item['description'] );
		}

		$data = [
			'name' => $name,
			'items' => $items,
		];

		update_option( 'modern-settings/repeated_form', $data );

		return $data;
	}
);
