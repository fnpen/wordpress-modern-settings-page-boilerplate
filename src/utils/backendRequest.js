import { createEffect, sample } from 'effector';
import $ from 'jquery';
import { addNotice } from '../components/Notifications';

export const backendRequest = createEffect(async ({ action, data }) => {
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

		if (!response.success) {
			throw new Error(response.data?.error ?? response.data ?? 'Error');
		}

		return response.data;
	} catch (err) {
		throw new Error(err.message);
	}
});

sample({
	clock: backendRequest.failData,
	fn: (data) => ({
		status: 'error',
		content: data?.message ?? data ?? 'Error',
	}),
	target: addNotice,
});
