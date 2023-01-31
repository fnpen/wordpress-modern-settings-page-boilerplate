import {
	BaseControl,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Disabled,
	Flex,
	FlexBlock,
	Spinner,
	TextControl,
	__experimentalHeading as Heading,
	__experimentalText as Text,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStore } from 'effector-react';
import { RepeatedItem } from './RepeatedItem';
import { $items, $name, addItem, doSave, nameChanged, resetForm, saveToServer } from './state';

export const RepeatedForm = () => {
	const name = useStore($name);
	const items = useStore($items);
	const isSaving = useStore(saveToServer.pending);

	return (
		<Card>
			<CardHeader>
				<Heading>{__('Repeated Form', 'wp-modern-settings-page-boilerplate')}</Heading>
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

					<BaseControl
						label={__('Widgets', 'wp-modern-settings-page-boilerplate')}
						__nextHasNoMarginBottom={true}
					>
						<Card isBorderless={items.length > 0}>
							{items.length ? (
								<>
									{items.map((item) => (
										<RepeatedItem key={item.id} item={item} />
									))}
								</>
							) : null}
							<CardFooter>
								<Flex>
									<FlexBlock>
										{!items.length ? (
											<Text>
												{__(
													'No Items',
													'wp-modern-settings-page-boilerplate'
												)}
											</Text>
										) : null}
									</FlexBlock>

									<Button variant="secondary" onClick={addItem}>
										{__('Add Item', 'wp-modern-settings-page-boilerplate')}
									</Button>
								</Flex>
							</CardFooter>
						</Card>
					</BaseControl>
					{isSaving && (
						<div className="spinner-wrap-overlay">
							<Spinner />
						</div>
					)}
				</Disabled>
			</CardBody>
			<CardFooter className="components-card-footer--sticky">
				<Flex>
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
