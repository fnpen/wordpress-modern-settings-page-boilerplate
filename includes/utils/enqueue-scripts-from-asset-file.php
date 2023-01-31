<?php

namespace ModernSettingsPageBoilerplate {
	function enqueue_scripts_from_asset_file( $name, $plugin_file ) {
		$script_asset_path = dirname( $plugin_file ) . "/build/$name.asset.php";
		if ( file_exists( $script_asset_path ) ) {
			$script_asset = include $script_asset_path;

			if ( in_array( 'wp-react-refresh-runtime', $script_asset['dependencies'], true ) && ! constant( 'SCRIPT_DEBUG' ) ) {
				wp_die( esc_html__( 'SCRIPT_DEBUG should be true. You use `hot` mode, it requires `wp-react-refresh-runtime` which availably only when SCRIPT_DEBUG is enabled.', 'wp-modern-settings-page-boilerplate' ) );
			}

			wp_enqueue_script( "wp-modern-settings-page-boilerplate-$name", plugins_url( "build/$name.js", $plugin_file ), $script_asset['dependencies'], $script_asset['version'], true );

			wp_enqueue_style( "wp-modern-settings-page-boilerplate-$name", plugins_url( "build/$name.css", $plugin_file ), [], $script_asset['version'], 'all' );
		}
	}
}
