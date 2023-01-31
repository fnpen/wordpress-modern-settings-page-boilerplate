import {
	Card,
	CardBody,
	CardHeader,
	DropdownMenu,
	Flex,
	FlexBlock,
	FlexItem,
	MenuGroup,
	MenuItem,
	TextareaControl,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { close, moreVertical, reset } from '@wordpress/icons';
import { changeItem, removeItem, resetItem } from './state';

export const RepeatedItem = ({ item }) => {
	const { id, title, description, priority } = item;

	return (
		<Card size="small">
			<CardHeader isShady>
				<Flex align={'center'}>
					<FlexBlock>{title}</FlexBlock>
					<FlexItem>
						<Flex align={'center'}>
							<DropdownMenu
								icon={moreVertical}
								label={__('Actions', 'wp-modern-settings-page-boilerplate')}
								toggleProps={{
									isSmall: true,
									iconSize: 16,
								}}
							>
								{({ onClose }) => (
									<>
										<MenuGroup>
											{resetItem && (
												<MenuItem
													icon={reset}
													onClick={() => {
														resetItem(id);
														onClose();
													}}
												>
													{__(
														'Reset',
														'wp-modern-settings-page-boilerplate'
													)}
												</MenuItem>
											)}
											<MenuItem
												icon={close}
												onClick={() => {
													removeItem(id);
													onClose();
												}}
											>
												{__(
													'Remove',
													'wp-modern-settings-page-boilerplate'
												)}
											</MenuItem>
										</MenuGroup>
									</>
								)}
							</DropdownMenu>
						</Flex>
					</FlexItem>
				</Flex>
			</CardHeader>
			<CardBody>
				<TextControl
					label={__('Widget Title', 'wp-modern-settings-page-boilerplate')}
					onChange={(v) => changeItem([id, 'title', v])}
					value={title ?? ''}
				/>
				<TextareaControl
					label={__('Widget Content', 'wp-modern-settings-page-boilerplate')}
					help={__(
						'You can use HTML markup with links.',
						'wp-modern-settings-page-boilerplate'
					)}
					value={description ?? ''}
					rows="4"
					onChange={(v) => changeItem([id, 'description', v])}
				/>
				<ToggleGroupControl
					label={__('Priority', 'wp-modern-settings-page-boilerplate')}
					value={priority ?? ''}
					onChange={(v) => changeItem([id, 'priority', v])}
					isBlock
				>
					<ToggleGroupControlOption
						value=""
						label={__('Top', 'wp-modern-settings-page-boilerplate')}
					/>
					<ToggleGroupControlOption
						value="high"
						label={__('High', 'wp-modern-settings-page-boilerplate')}
					/>
					<ToggleGroupControlOption
						value="default"
						label={__('Default', 'wp-modern-settings-page-boilerplate')}
					/>
					<ToggleGroupControlOption
						value="low"
						label={__('Low', 'wp-modern-settings-page-boilerplate')}
					/>
				</ToggleGroupControl>
			</CardBody>
		</Card>
	);
};
