/**
 *
 */
var webpack = require('webpack');



/**
 *
 */
module.exports = {
	target: 'node',
	entry: [
		'./index.js'
	],
	output: {
		path: './dist',
		publicPath: '/dist/',
		filename: 'essence.js',
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader?stage=0&optional=runtime',
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
};
