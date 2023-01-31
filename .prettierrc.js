'use strict';

const wordPressConfig = require('@wordpress/prettier-config');

delete wordPressConfig['parentSpacing'];

module.exports = {
	...wordPressConfig,
	printWidth: 100,
	useTabs: true,
	tabWidth: 4,
	overrides: [
		{
			files: '*.json',
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
