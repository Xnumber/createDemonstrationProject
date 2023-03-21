/* eslint-disable */
const {exec} = require('child_process');
const mode = process.env.NODE_ENV;
const webpack = require("webpack");
const devConfig = require("./config/webpack.dev")
const WebpackDevServer = require('webpack-dev-server');
if (mode === "production") {
	exec("npm run build", (err, stdout, stderr) => {
		if(err) {
			console.log(err)
		}
		if(stdout) {
			console.log(stdout)
		}
		if(stderr) {
			console.log(stderr)
		}
	})
} else {
	const compiler = webpack(devConfig);
	const devServerOptions = { ...devConfig.devServer, open: true };
	const server = new WebpackDevServer(devServerOptions, compiler);
	const runServer = async () => {
		console.log('Starting server...');
		await server.start();
	};
	runServer();
}