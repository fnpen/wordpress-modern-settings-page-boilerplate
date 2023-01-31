<?php

namespace ModernSettingsPageBoilerplate {
	define( 'NONCE_ACTION', 'wp-modern-settings-page-boilerplate' );

	add_filter( 'modern_settings_variables', __NAMESPACE__ . '\\add_variable_to_frontend' );

	function add_variable_to_frontend( $variables ) {
		$variables['nonce'] = wp_create_nonce( NONCE_ACTION );

		return $variables;
	}

	function register_ajax_method( $action, $method ) {
		add_action(
			'wp_ajax_' . $action,
			function() use ( $method ) {
				if ( ! isset( $_REQUEST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_key( $_REQUEST['_wpnonce'] ), NONCE_ACTION ) ) {
					die( esc_html__( 'Security check', 'wp-modern-settings-page-boilerplate' ) );
				}

				try {
					$result = call_user_func_array( $method, [] );
					wp_send_json_success( $result );
				} catch ( \Exception $e ) {
					wp_send_json_error(
						[
							'error' => $e->getMessage(),
						]
					);
				}
			}
		);
	}
}
