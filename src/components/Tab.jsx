import clsx from 'clsx';
import { useContext } from 'react';
import { TabProvider } from './Tabs';

export const Tab = ({ children, name = '' }) => {
	const { value, onChange } = useContext(TabProvider);
	return (
		<button
			className={clsx('modern-settings-tab', {
				'modern-settings-tab--active': value === name,
			})}
			aria-current="true"
			onClick={() => onChange(name)}
		>
			{children}
		</button>
	);
};
