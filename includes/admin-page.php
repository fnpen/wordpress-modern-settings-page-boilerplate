<?php

namespace ModernSettingsPageBoilerplate;

add_action( 'admin_menu', __NAMESPACE__ . '\\admin_menu', 100 );

function admin_menu() {
	$hook_name = add_menu_page(
		__( 'Modern Settings', 'wp-modern-settings-page-boilerplate' ),
		__( 'Modern Settings', 'wp-modern-settings-page-boilerplate' ),
		'manage_options',
		'wp-modern-settings-page-boilerplate',
		__NAMESPACE__ . '\\admin_page',
		'dashicons-games',
		null
	);

	add_action( "load-{$hook_name}", __NAMESPACE__ . '\\admin_page_load' );
}


/**
 * Includes asset.
 *
 * @return void
 */
function wp_enqueue_scripts() {
	enqueue_scripts_from_asset_file( 'settings', MODERN_SETTINGS_PLUGIN_FILE );

	wp_localize_script( 'wp-modern-settings-page-boilerplate-settings', 'MODERN_SETTINGS', apply_filters( 'modern_settings_variables', [] ) );

	// wp_set_script_translations( 'wp-modern-settings-page-boilerplate-core', 'wp-modern-settings-page-boilerplate', plugin_dir_path( MODERN_SETTINGS_PLUGIN_FILE ) . 'languages/' ); ?
}

function admin_page_load() {
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\wp_enqueue_scripts' );
	remove_all_filters( 'admin_footer_text' );
	remove_filter( 'update_footer', 'core_update_footer' );
	add_filter( 'update_footer', __NAMESPACE__ . '\\update_footer' );
	add_filter( 'admin_footer_text', __NAMESPACE__ . '\\admin_footer_text' );
	add_filter( 'admin_body_class', __NAMESPACE__ . '\\admin_body_class' );

	$screen = get_current_screen();

	$screen->add_help_tab(
		[
			'id'      => 'my_help_tab',
			'title'   => __( 'My Help Tab', 'wp-modern-settings-page-boilerplate' ),
			'content' => '<p>' . __( 'Descriptive content that will show in My Help Tab-body goes here.', 'wp-modern-settings-page-boilerplate' ) . '</p>',
		]
	);
}

function admin_body_class( $classes ) {
	$classes .= ' modern-settings';

	return $classes;
}

function update_footer() {
	return '<div style="float: right;">Made with love<div style="display: inline-block;margin: 0px 2px;color:#e74c3c;">♥</div> by <a href="https://ilyazolotov.com/" target="_blank">Ilya Zolotov</a></div>';
}

function admin_footer_text() {
	return '';
}

function admin_page() {
	?>
	<noscript>
		<div class="no-js"><?php echo esc_html__( 'Warning: This options panel will not work properly without JavaScript, please enable it.', 'wp-modern-settings-page-boilerplate' ); ?></div>
	</noscript>
	<style>
		#ui-loading {
			height: calc(100vh - 100px);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	</style>
	<div id="ui-loading"><?php echo esc_html__( 'Loading…', 'wp-modern-settings-page-boilerplate' ); ?></div>
	<div id="ui-settings"></div>
	<?php
}
