/**
 *
 */
var webpack = require('webpack');



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

	// for request
	externals: {
		fs: '{}',
		tls: '{}',
		net: '{}',
		console: '{}'
	}
};
