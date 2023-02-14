/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshTypeScript = require('react-refresh-typescript');
// const classNameMapper = require("../plugins/classCompressPlugin/class-compress-plugin")
// const ClassNameCompressPlugin = require("../plugins/classCompressPlugin/class-compress-plugin");
const entryJS = "../src/index.tsx";
// const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

module.exports = (mode) => {
	const isDevelopment =  mode !== 'production';
	return {
		entry: {
			main: path.resolve(__dirname, entryJS),
		},
		output: {
			filename: "assets/[name].js",
			// devServer default static 位置
			path: path.resolve(__dirname, "../dist/"),
		},
		resolve: {
			// Add `.ts` and `.tsx` as a resolvable extension.
			extensions: [".ts", ".tsx", ".js"],
			alias: {
				src: path.resolve(__dirname, "../src"),
				style: path.resolve(__dirname, "../src/style"),
				store: path.resolve(__dirname, "../src/app/store.ts"),
				features: path.resolve(__dirname, "../src/features"),
				lib: path.resolve(__dirname, "../lib"),
				atoms: path.resolve(__dirname, "../src/components/atoms"),
				molecules: path.resolve(__dirname, "../src/components/molecules"),
				organisms: path.resolve(__dirname, "../src/components/organisms"),
				templates: path.resolve(__dirname, "../src/components/templates"),
				pages: path.resolve(__dirname, "../src/components/pages"),
				service: path.resolve(__dirname, "../src/app/service"),
				constants: path.resolve(__dirname, "../src/constants"),
			},
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						"style-loader",
						"css-loader"
					]
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /node_modules/,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						"sass-loader",
					],
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					exclude: /node_modules/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
							},
						},
					],
				},
				{
					test: /\.svg$/i,
					// exclude: /node_modules/,
					issuer: /\.[jt]sx?$/,
					use: [{ loader: "@svgr/webpack", options: { icon: true } }],
				},
				// react refresh
				// https://github.com/pmmmwh/react-refresh-webpack-plugin
				{
					test: /\.[jt]sx?$/,
					exclude: /node_modules/,
					use: [
					  {
						loader: require.resolve('ts-loader'),
						options: {
						  getCustomTransformers: () => ({
							before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
						  }),
						  transpileOnly: isDevelopment,
						},
					  },
					],
				  }
				// {
				// 	test: /\.js/,
				// 	exclude: /node_modules/,
				// 	include: ["/node_modules/chartjs/dist/chart.mjs"]
				// }
			]
		},
		plugins: [
		// 	new ClassNameCompressPlugin()
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "../src/index.html"),
				// 若output.publicPath有指定會到其相對位置
				publicPath: "/",
				filename: "index.html",
				inject: true,
				favicon: path.resolve(__dirname, "../src/favicon2.ico"),
				// templateParameters: {
				// },
				'cdn': !isDevelopment ? "<script crossorigin src='https://unpkg.com/react@^18.2.0/umd/react.production.min.js'></script><script crossorigin src='https://unpkg.com/react-dom@^18.2.0/umd/react-dom.production.min.js'></script>": ""
			}),
			// new DynamicCdnWebpackPlugin()
		],
		// externals: {
		// 	react: 'React',
		// 	"react-dom/client": "ReactDOM",
		// 	// 'react-router-dom': ["createBrowserRouter", "react-router-dom"]
		// },	
	};
};