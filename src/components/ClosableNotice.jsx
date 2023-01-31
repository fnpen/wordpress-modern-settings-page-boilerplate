import { Notice, __experimentalSpacer as Spacer } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createEffect, createStore } from 'effector';
import { useStore } from 'effector-react';
import { backendRequest } from '../utils/backendRequest';

const $noticeVisible = createStore(!MODERN_SETTINGS.notice_hidden);
const doHideNotice = createEffect(() =>
	backendRequest({
		action: 'modern-settings/hide-notice',
	})
);
$noticeVisible.on(doHideNotice.doneData, (_, result) => !result);

export const ClosableNotice = () => {
	const noticeVisible = useStore($noticeVisible);
	return (
		<>
			{noticeVisible && (
				<>
					<Notice onRemove={doHideNotice}>
						{__(
							'Thank you for trying this boilerplate! Close the notice to save state to server.',
							'wp-modern-settings-page-boilerplate'
						)}
					</Notice>
					<Spacer marginBottom={6} />
				</>
			)}
		</>
	);
};
