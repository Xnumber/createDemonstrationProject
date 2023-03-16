const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = merge(common("production"), {
	mode: "production",
	output: {
		clean: true, // Clean the output directory before emit.
		chunkFilename: "assets/[chunkhash].js"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				// react: {
				//     test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux|@reduxjs[\\/]toolkit)[\\/]/,
				//     name: 'react',
				//     chunks: 'all',
				// },
				// "react-table": {
				//     test: /[\\/]node_modules[\\/](react-table)[\\/]/,
				//     name: 'react-table',
				//     chunks: 'all',
				// },
				// "react-i18n": {
				//     test: /[\\/]node_modules[\\/](i18next|i18next-browser-languagedetector|i18next-http-backend|react-i18next)[\\/]/,
				//     name: 'react-i18n',
				//     chunks: 'all',
				// },
			},
		},
	},
	externals: {
		react: 'React',
		"react-dom/client": "ReactDOM",
		// 'react-router-dom': ["createBrowserRouter", "react-router-dom"]
	},
	// https://unpkg.com/react@18.2.0/umd/react.production.min.js
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../src/404.html"),
			filename: "404.html",
			inject: false
		}),
		new DefinePlugin({
			SIMPLE_CONTENT_MANAGEMENT_API_BASE_URL: JSON.stringify("https://create-demonstration-project.herokuapp.com"),
			IMAGE_STORAGE_URL: JSON.stringify("https://frontenddeveloper.url.tw/public")
		})
	]
});