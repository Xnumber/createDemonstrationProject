const path = require("path");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common("development"), {
	mode: "development",
	devServer: {
		historyApiFallback: true,
		open: true,
		port: 3000,
		hot: true
	},
	plugins: [
		new ReactRefreshWebpackPlugin()
	].filter(Boolean),
	optimization: {
		// don't minimize so we can debug
		minimize: false,
		/*
          The value 'single' instead creates a runtime file to be shared for all generated chunks.
          https://github.com/webpack/webpack-dev-server/issues/2792
        */
		runtimeChunk: "single",
	},
	devtool: "eval-source-map",
});