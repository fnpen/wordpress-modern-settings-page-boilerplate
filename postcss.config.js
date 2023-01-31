const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [require('postcss-import'), require('autoprefixer'), postcssPresetEnv({ stage: 0 })],
};
