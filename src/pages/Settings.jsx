import {
	__experimentalHeading as Heading,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RepeatedForm } from '../components/forms/repeated-form/RepeatedForm';
import { SimpleForm } from '../components/forms/SimpleForm';

export const Settings = () => {
	return (
		<>
			<Heading>{__('Settings Header', 'wp-modern-settings-page-boilerplate')}</Heading>
			<Spacer marginBottom={6} />

			<SimpleForm />
			<Spacer marginBottom={6} />

			<RepeatedForm />
			<Spacer marginBottom={6} />
		</>
	);
};
