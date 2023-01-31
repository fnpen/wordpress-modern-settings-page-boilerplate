import { useMemo, useState } from 'react';
import { Body } from './Body';
import { Header } from './Header';
import { Tab } from './Tab';
import { Tabs } from './Tabs';

export const Layout = ({ title, children, tabs = [] }) => {
	const [selectedTab, setSelectedTab] = useState(tabs?.[0]?.name || '');

	return (
		<>
			<div className="modern-settings-header">
				<div className="modern-settings-title-section">
					<Header>{title}</Header>
				</div>
				<Tabs value={selectedTab} onChange={(v) => setSelectedTab(v)}>
					{tabs.map(({ name, title }) => (
						<Tab key={name} name={name}>
							{title}
						</Tab>
					))}
				</Tabs>
			</div>
			<Body>{useMemo(() => children({ selectedTab }), [selectedTab])}</Body>
		</>
	);
};
