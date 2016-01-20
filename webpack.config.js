/**
 *
 */
var webpack = require('webpack');
var BannerPlugin = webpack.BannerPlugin;



/**
 *
 */
module.exports = {
	target: 'node',
	devtool: 'source-map',
	entry: [
		'./index.js'
	],
	output: {
		path: './dist',
		filename: 'essence.js',
	},
	module: {
		loaders: [
			{
				loader: "json-loader",
				test: /\.json$/
			},
			{
				loader: 'babel-loader?stage=0&optional=runtime',
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	},

	plugins: [
		// sourcemap support
		new BannerPlugin(
			"require('source-map-support').install();",
			{
				raw: true,
				entryOnly: false
			}
		)
	],

	// for the request module
	externals: {
		fs: '{}',
		tls: '{}',
		net: '{}',
		console: '{}'
	}
};
