<?php

namespace ModernSettingsPageBoilerplate;

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
