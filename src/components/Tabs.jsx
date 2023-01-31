import { createContext } from 'react';

export const TabProvider = createContext({
	value: '',
	onChange: () => {},
});

export const Tabs = ({ children, value, onChange }) => {
	return (
		<nav className="modern-settings-tabs-wrapper hide-if-no-js">
			<TabProvider.Provider value={{ value, onChange }}>{children}</TabProvider.Provider>
		</nav>
	);
};
