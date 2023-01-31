import { createElement } from 'react';
import { render } from 'react-dom';
import { App } from './App';

document.getElementById('ui-loading')?.remove();
render(createElement(App), document.getElementById('ui-settings'));
