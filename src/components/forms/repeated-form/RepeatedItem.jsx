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
								label={'Actions'}
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
													Reset
												</MenuItem>
											)}
											<MenuItem
												icon={close}
												onClick={() => {
													removeItem(id);
													onClose();
												}}
											>
												Remove
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
					label={'Widget Title'}
					onChange={(v) => changeItem([id, 'title', v])}
					value={title ?? ''}
				/>
				<TextareaControl
					label={'Widget Content'}
					help="You can use HTML markup with links."
					value={description ?? ''}
					rows="4"
					onChange={(v) => changeItem([id, 'description', v])}
				/>
				<ToggleGroupControl
					label={'Priority'}
					value={priority ?? ''}
					onChange={(v) => changeItem([id, 'priority', v])}
					isBlock
				>
					<ToggleGroupControlOption value="" label="Top" />
					<ToggleGroupControlOption value="high" label="High" />
					<ToggleGroupControlOption value="default" label="Default" />
					<ToggleGroupControlOption value="low" label="Low" />
				</ToggleGroupControl>
			</CardBody>
		</Card>
	);
};
