import * as webpack from "webpack";
import PathHelper from "./webpack.helper";
import { AngularCompilerPlugin } from "@ngtools/webpack";

const workboxPlugin = require("workbox-webpack-plugin");

const Production: webpack.Configuration = {
	plugins: [
		new AngularCompilerPlugin({
			tsConfigPath: PathHelper.GetPath(["tsconfig.json"]),
			mainPath: PathHelper.GetPath(["front-end", "main.ts"]),
			sourceMap: false
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			warnings: false,
			sourceMap: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new workboxPlugin({
			globDirectory: PathHelper.GetPath(["wwwroot"]),
			globPatterns: ["**/*.{html,js,css,png}"],
			swDest: PathHelper.GetPath(["wwwroot", "sw.js"]),
			minify: true
		}),
		new webpack.NormalModuleReplacementPlugin(/Environment\.ts/, "Environment.pro.ts")
	]
};

export default Production;