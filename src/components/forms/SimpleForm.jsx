import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CheckboxControl,
	Disabled,
	Flex,
	FlexBlock,
	Spinner,
	TextareaControl,
	TextControl,
	__experimentalHeading as Heading,
	__experimentalText as Text,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { useStore } from 'effector-react';
import { backendRequest } from '../../utils/backendRequest';
import { addNotice } from '../Notifications';

const initialFormData = MODERN_SETTINGS['simple_form'] ?? {};

const nameChanged = createEvent();
const descriptionChanged = createEvent();
const throwErrorChanged = createEvent();
const resetForm = createEvent();
const $name = createStore(initialFormData.name ?? '');
const $description = createStore(initialFormData.description ?? '');
const $throwError = createStore(false);

$name.on(nameChanged, (_, v) => v).reset(resetForm);
$description.on(descriptionChanged, (_, v) => v).reset(resetForm);
$throwError.on(throwErrorChanged, (_, v) => v).reset(resetForm);

const saveToServer = createEffect(({ name, description, throwError }) =>
	backendRequest({
		action: 'modern-settings/simple_form-save',
		data: { name, description, throwError },
	})
);

const doSave = createEvent();
sample({
	clock: doSave,
	source: combine($name, $description, $throwError, (name, description, throwError) => ({
		name,
		description,
		throwError,
	})),
	target: saveToServer,
});

sample({
	clock: saveToServer.done,
	fn: () => ({ content: __('Simple Form Saved.', 'wp-modern-settings-page-boilerplate') }),
	target: addNotice,
});

export const SimpleForm = () => {
	const name = useStore($name);
	const description = useStore($description);
	const throwError = useStore($throwError);
	const isSaving = useStore(saveToServer.pending);

	return (
		<Card>
			<CardHeader>
				<Heading>{__('Simple Form', 'wp-modern-settings-page-boilerplate')}</Heading>
			</CardHeader>
			<CardBody>
				<Disabled isDisabled={isSaving}>
					<TextControl
						help={__(
							'Help text to explain the input.',
							'wp-modern-settings-page-boilerplate'
						)}
						label={__('Label Text', 'wp-modern-settings-page-boilerplate')}
						onChange={nameChanged}
						value={name}
					/>
					<TextareaControl
						label={__('Text', 'wp-modern-settings-page-boilerplate')}
						help={__('Enter some text', 'wp-modern-settings-page-boilerplate')}
						value={description}
						onChange={descriptionChanged}
					/>
					<CheckboxControl
						label={__(
							'Check to throw server error',
							'wp-modern-settings-page-boilerplate'
						)}
						checked={throwError}
						onChange={throwErrorChanged}
					/>
					{isSaving && (
						<div className="spinner-wrap-overlay">
							<Spinner />
						</div>
					)}
				</Disabled>
			</CardBody>
			<CardFooter>
				<Flex>
					<FlexBlock>
						<Text>{__('Additional text', 'wp-modern-settings-page-boilerplate')}</Text>
					</FlexBlock>
					<Button variant="tertiary" onClick={resetForm} disabled={isSaving}>
						{__('Reset', 'wp-modern-settings-page-boilerplate')}
					</Button>
					<Button variant="primary" onClick={doSave} disabled={isSaving}>
						{__('Save', 'wp-modern-settings-page-boilerplate')}
					</Button>
				</Flex>
			</CardFooter>
		</Card>
	);
};
