const path = require("path");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const entryHtml = "../src/index.html";

const webpack = require("webpack");
module.exports = {
	mode: "development",
	devServer: {
		// devMiddleware: {
		//     writeToDisk: true
		// },
		// watchFiles: ['./dist/**/*.js'],
		historyApiFallback: true,
		open: true,
		// static: [
		// 	{
		// 		directory: "./dist",
		// 	},
		// 	{
		// 		directory: "./public",
		// 		publicPath: "/assets"
		// 	},
		// ],
		port: 3000,
		hot: true
		// proxy: {
		// 	"/getTest": "http://localhost:6001",
		// 	"/postTest": "http://localhost:6001",
		// }
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
};