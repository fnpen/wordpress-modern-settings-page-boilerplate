import { __ } from '@wordpress/i18n';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import './styles/styles.css';

export const App = () => {
	return (
		<Layout
			title={__('Modern Settings 🚀', 'wp-modern-settings-page-boilerplate')}
			tabs={[
				{ name: 'home', title: __('Home', 'wp-modern-settings-page-boilerplate') },
				{ name: 'settings', title: __('Settings', 'wp-modern-settings-page-boilerplate') },
				{
					name: 'policy',
					title: __('Policy Guide', 'wp-modern-settings-page-boilerplate'),
				},
			]}
		>
			{({ selectedTab }) => (
				<>
					{selectedTab === 'home' && <Home />}
					{selectedTab === 'settings' && <Settings />}
				</>
			)}
		</Layout>
	);
};
