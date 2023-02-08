/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const commonConfig = require("./config/webpack.common");
const devConfig = require("./config/webpack.dev");
const prodConfig = require("./config/webpack.prod");

module.exports = (env, args) => {
	switch(args.env.mode){
	case "development": {
		const config = commonConfig(args.env.mode);
		return merge(config, devConfig);
	}
	case "production": {
		return merge(commonConfig(args.env.mode), prodConfig);
	}
	default: {
		throw new Error("No matching configuration was found!");
	}
	}
};