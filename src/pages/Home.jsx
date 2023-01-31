import {
	Button,
	Card,
	CardBody,
	CardDivider,
	CardFooter,
	CardHeader,
	CardMedia,
	Notice,
	Panel,
	PanelBody,
	PanelRow,
	__experimentalHeading as Heading,
	__experimentalSpacer as Spacer,
	__experimentalText as Text,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useCallback, useState } from 'react';
import { backendRequest } from '../utils/backendRequest';

export const Home = () => {
	const [noticeVisible, setNoticeVisible] = useState(!MODERN_SETTINGS['notice_hidden']);

	const doHideNotice = useCallback(async () => {
		const { success } = await backendRequest({ action: 'modern-settings/hide-notice' });
		setNoticeVisible(!!success);
	}, [setNoticeVisible]);

	return (
		<>
			{noticeVisible && (
				<Notice onRemove={doHideNotice}>
					{__('Thank you for trying this boilerplate!', 'wp-modern-settings-page-boilerplate')}
				</Notice>
			)}

			<Heading>
				{__('Card with Different Components', 'wp-modern-settings-page-boilerplate')}
			</Heading>
			<Spacer marginBottom={6} />
			<Panel header="Welcome">
				<PanelBody title="WordPress React Components Storybook">
					<p>
						{__(
							`The WordPress Gutenberg project uses Storybook to view and work with the UI components developed in the WordPress package @wordpress/components.`,
							'wp-modern-settings-page-boilerplate'
						)}
					</p>
					<p>
						<span>
							{__('The storybook of available components: ', 'wp-modern-settings-page-boilerplate')}
						</span>
						<a href="https://wordpress.github.io/gutenberg/" target="_blank">
							https://wordpress.github.io/gutenberg/
						</a>
					</p>
				</PanelBody>
				<PanelBody title={__('Second section', 'wp-modern-settings-page-boilerplate')}>
					<PanelRow>
						<div
							style={{
								background: '#ddd',
								height: 100,
								width: '100%',
							}}
						/>
					</PanelRow>
				</PanelBody>
			</Panel>
			<Spacer marginBottom={10} />
			<Card>
				<CardHeader>
					<Heading>
						{__('Card with Different Components', 'wp-modern-settings-page-boilerplate')}
					</Heading>
				</CardHeader>
				<CardBody>
					<Text highlightWords={['con']}>
						{__(
							`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis dictum
						tortor, eu tincidunt justo scelerisque tincidunt. Duis semper dui id augue
						malesuada, ut feugiat nisi aliquam. Vestibulum venenatis diam sem, finibus
						dictum massa semper in. Nulla facilisi. Nunc vulputate faucibus diam, in
						lobortis arcu ornare vel. In dignissim nunc sed facilisis finibus. Etiam
						imperdiet mattis arcu, sed rutrum sapien blandit gravida. Aenean
						sollicitudin neque eget enim blandit, sit amet rutrum leo vehicula. Nunc
						malesuada ultricies eros ut faucibus. Aliquam erat volutpat. Nulla nec
						feugiat risus. Vivamus iaculis dui aliquet ante ultricies feugiat.
						Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
						cubilia curae; Vivamus nec pretium velit, sit amet consectetur ante.
						Praesent porttitor ex eget fermentum mattis.`,
							'wp-modern-settings-page-boilerplate'
						)}
					</Text>
				</CardBody>
				<CardBody>
					<Text numberOfLines={2} truncate>
						{__(
							`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis dictum
						tortor, eu tincidunt justo scelerisque tincidunt. Duis semper dui id augue
						malesuada, ut feugiat nisi aliquam. Vestibulum venenatis diam sem, finibus
						dictum massa semper in. Nulla facilisi. Nunc vulputate faucibus diam, in
						lobortis arcu ornare vel. In dignissim nunc sed facilisis finibus. Etiam
						imperdiet mattis arcu, sed rutrum sapien blandit gravida. Aenean
						sollicitudin neque eget enim blandit, sit amet rutrum leo vehicula. Nunc
						malesuada ultricies eros ut faucibus. Aliquam erat volutpat. Nulla nec
						feugiat risus. Vivamus iaculis dui aliquet ante ultricies feugiat.
						Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
						cubilia curae; Vivamus nec pretium velit, sit amet consectetur ante.
						Praesent porttitor ex eget fermentum mattis.`,
							'wp-modern-settings-page-boilerplate'
						)}
					</Text>
				</CardBody>
				<CardDivider />
				<CardBody>
					<Text>{__('CardBody (after CardDivider)', 'wp-modern-settings-page-boilerplate')}</Text>
				</CardBody>
				<CardMedia>
					<img
						alt="Card Media"
						src="https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1867&q=80"
					/>
				</CardMedia>
				<CardFooter>
					<Text>{__('CardFooter', 'wp-modern-settings-page-boilerplate')}</Text>
					<Button variant="link">{__('Link Button', 'wp-modern-settings-page-boilerplate')}</Button>
					<Button variant="secondary">
						{__('Secondary Button', 'wp-modern-settings-page-boilerplate')}
					</Button>
				</CardFooter>
			</Card>
		</>
	);
};
