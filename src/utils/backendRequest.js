import $ from 'jquery';

export const backendRequest = async ({ action, data }) => {
	try {
		const response = await $.ajax({
			type: 'POST',
			url: ajaxurl,
			data: {
				action,
				...data,
				_wpnonce: MODERN_SETTINGS.nonce,
			},
		});

		return response.data;
	} catch (err) {}
};
