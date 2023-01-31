import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import clone from 'deep-clone';
import { config } from 'dotenv';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

import { fileURLToPath } from 'url';

const createConfig = ({ name, entry, dir, externals }) => {
	const isProduction = process.env.NODE_ENV === 'production';

	const config = {
		...clone(defaultConfig),
		name,
		entry,
		context: path.resolve(__dirname, dir),
		module: {
			...defaultConfig.module,
			rules: [
				{
					resourceQuery: /inline/,
					test: /\.(bmp|png|jpe?g|gif)$/i,
					type: 'asset/inline',
				},
				{
					test: /\.md$/i,
					type: 'asset/source',
				},
				...defaultConfig.module.rules,
			],
		},

		watchOptions: {
			aggregateTimeout: 200,
			poll: 1000,
		},

		resolveLoader: {
			modules: [
				path.resolve(__dirname, dir, 'node_modules'),
				path.resolve(__dirname, dir, './'),
				path.resolve(__dirname, 'node_modules'),
				path.resolve(__dirname, 'scripts'),
			],
		},

		stats: {
			children: false,
			all: false,
			entrypoints: true,
			warnings: true,
			errors: true,
			hash: false,
			timings: true,
			errorDetails: true,
			builtAt: true,
		},

		experiments: {
			topLevelAwait: true,
		},

		resolve: {
			...defaultConfig.resolve,
			extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
			alias: {
				...defaultConfig.resolve.alias,
			},
		},

		optimization: {
			...defaultConfig.optimization,
			removeEmptyChunks: true,
		},

		externals: {
			...defaultConfig.externals,
			...(externals || {}),
		},

		output: {
			...defaultConfig.output,
			filename: '[name].js',
			path: path.resolve(__dirname, dir, 'build'),
		},

		plugins: [
			new MiniCSSExtractPlugin({ filename: '[name].css' }),

			...defaultConfig.plugins.filter(
				(plugin) => !['LiveReloadPlugin'].includes(plugin.constructor.name)
			),
		],
	};

	if (!isProduction) {
		config.devServer.host = '127.0.0.1';
		config.devServer.allowedHosts = 'all';

		config.devServer.server = {
			type: 'https',
			options: {
				key: process.env['TSL_KEY'],
				cert: process.env['TSL_CERT'],
				requestCert: false,
			},
		};
	} else {
		delete config.devServer;
	}

	return config;
};

export default [
	createConfig({
		name: 'settings',
		dir: './',
		entry: {
			settings: './src/settings.js',
		},
	}),
];
