import * as webpack from "webpack";
import { AngularCompilerPlugin } from "@ngtools/webpack";
import PathHelper from "./webpack.helper";
const LiveReloadPlugin = require("webpack-livereload-plugin");

const DevelopmentConfig: webpack.Configuration = {
	cache: true,
	devtool: "source-map",
	performance: {
		hints: false
	},
	plugins: [
		new LiveReloadPlugin({}),
		new AngularCompilerPlugin({
			tsConfigPath: PathHelper.GetPath(["tsconfig.json"]),
			mainPath: PathHelper.GetPath(["front-end", "main.ts"]),
			skipCodeGeneration: true,
			sourceMap: true
		}),
		new webpack.DllReferencePlugin({
			context: process.cwd(),
			manifest: require(PathHelper.GetPath(["wwwroot", "dist", "AngularStuff.json"]))
		}),
		new webpack.NormalModuleReplacementPlugin(/Environment\.ts/, "Environment.ts")
	]
};

export default DevelopmentConfig;