import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import PathHelper from "./webpack.helper";

const autoprefixer = require("autoprefixer");

const CommonConfig: webpack.Configuration = {
	entry: {
		main: PathHelper.GetPath(["front-end", "main.ts"]),
		polyfills: PathHelper.GetPath(["front-end", "polyfills.ts"]),
		vendor: PathHelper.GetPath(["front-end", "vendor.ts"]),
		sytles: PathHelper.GetPath(["front-end", "styles", "app-style.scss"])
	},
	output: {
		path: PathHelper.GetPath(["wwwroot"]),
		filename: "dist/[name].[hash].js",
		chunkFilename: "dist/[name].[id].[hash].chunk.js",
		publicPath: "/"
	},
	resolve: {
		extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"]
	},
	module: {
		rules: [
			{
				test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
				loader: "@ngtools/webpack"
			},
			{
				test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "assets/"
					}
				}]
			},
			{
				test: /\app-style.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "postcss-loader",
						options: {
							plugins: [autoprefixer()]
						}
					}, "sass-loader"]
				})
			},
			{
				test: /\.css$/,
				use: ["raw-loader"]
			},
			{
				test: /\.scss$/,
				exclude: /\app-style.scss$/,
				use: ["raw-loader", {
					loader: "postcss-loader",
					options: {
						plugins: [autoprefixer({
						})]
					}
				}, "sass-loader"]
			},
			{
				test: /\.html$/,
				exclude: /\index.html$/,
				use: ["raw-loader"]
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({ names: ["vendor", "polyfills"] }),
		new ExtractTextPlugin("dist/styles.css"),
		new HtmlWebpackPlugin({
			title: "My Pet Life",
			filename: "index.html",
			inject: "body",
			template: "front-end/index.html",
			production: process.argv.indexOf("pro") !== -1,
			minify: {
				removeAttributeQuotes: false,
				collapseWhitespace: true,
				minifyCSS: true,
				removeComments: true,
				removeEmptyAttributes: false
			}
		})
	]
};

export default CommonConfig;