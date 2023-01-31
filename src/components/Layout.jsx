import { __experimentalHeading as Heading } from '@wordpress/components';
import { useMemo, useState } from 'react';

import { Tab } from './Tab';
import { Tabs } from './Tabs';

export const Layout = ({ title, children, tabs = [] }) => {
	const [selectedTab, setSelectedTab] = useState(tabs?.[0]?.name || '');

	return (
		<div className="modern-settings-layout">
			<div className="modern-settings-header">
				<div className="modern-settings-title-section">
					<Heading as="h1">{title}</Heading>
				</div>
				<Tabs value={selectedTab} onChange={(v) => setSelectedTab(v)}>
					{tabs.map(({ name, title }) => (
						<Tab key={name} name={name}>
							{title}
						</Tab>
					))}
				</Tabs>
			</div>
			<div className="modern-settings-layout-body hide-if-no-js">
				{useMemo(() => children({ selectedTab }), [selectedTab])}
			</div>
		</div>
	);
};
