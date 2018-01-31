let webpackMerge = require("webpack-merge");

module.exports = function (env: any) {

	if (env === "dll") {
		console.log("@@@@@@@@@@ Running DLL Build @@@@@@@@@@");
		return require("./config/webpack.dll");
	}

	if (env === "pro") {
		console.log("@@@@@@@@@@ Running Production Build @@@@@@@@@@");
		return webpackMerge(require("./config/webpack.common"), require("./config/webpack.pro"));
	}

	if (env === "dev") {
		console.log("@@@@@@@@@@ Running Development Build @@@@@@@@@@");
		return webpackMerge(require("./config/webpack.common"), require("./config/webpack.dev"));
	}
}

