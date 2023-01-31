import { createElement } from 'react';
import { render } from 'react-dom';
import { App } from './App';

const run = () => {
	document.getElementById('ui-loading')?.remove();
	render(createElement(App), document.getElementById('ui-settings'));
};

document.addEventListener('DOMContentLoaded', run);
if (document.readyState === 'complete') {
	run();
}
