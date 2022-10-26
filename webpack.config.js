const path = require('path');

module.exports = {
	// Electron entry point
	entry: './app/src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'app/dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			// loads .js/jsx/json files
			{
				test: /\.jsx?$/,
				include: [path.resolve(__dirname, 'app/src')],
				loader: 'babel-loader',
				resolve: {
					extensions: ['.js', '.jsx', '.json'],
				},
			},
			{
				// loads .html files
				test: /\.(html)$/,
				include: [path.resolve(__dirname, 'app/src')],
				use: {
					loader: 'html-loader',
				},
			},
		],
	},
};
