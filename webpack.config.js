const { resolve } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin-next");
const WebpackMiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const WebpackESLintPlugin = require("eslint-webpack-plugin");
const WebpackCopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { name, version } = require("./package.json");

module.exports = ( env, options )=>{

	const IS_DEV = options.mode === "development";

	const SOURCE_PATH = resolve(__dirname, "source");
	const TEST_PATH = resolve(__dirname, "page-source");
	const BUILD_PATH = resolve(__dirname, "lottery");

	const HOST = "localhost";

	const server = {
		allowedHosts: "all",
		client: {
			webSocketURL: {
				hostname: HOST
			},
			logging: "none"
		},
		compress: false,
		devMiddleware: {
			publicPath: "/",
			writeToDisk: true
		},
		historyApiFallback: true,
		host: HOST,
		hot: true,
		https: true,
		open: true,
		static: {
			directory: BUILD_PATH
		}
	};

	const entries = {
		index: "./source/index.js",
		webgl: "./workers/webgl.js"
	};

	const plugins = [
		new DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		}),
		new WebpackCopyPlugin({
			patterns: [
				{ from: "source/models", to: "./models/" },
				{ from: "source/images", to: "./images/" },
				{ from: "source/environments", to: "./environments/" }
			]
		}),
		new WebpackShellPlugin({
			onBuildExit: {
				scripts: [`touch ${ BUILD_PATH }/.${ version }`],
				blocking: true,
				parallel: false
			}
		}),
		new WebpackMiniCssExtractPlugin(),
		new HTMLWebpackPlugin({
			publicPath: "./",
			title: name,
			filename: "index.html",
			template: resolve(__dirname, "source/index.html"),
			meta: {
				viewport: "width=device-width, initial-scale=1"
			},
			excludeChunks: ["webgl"],
			minify: false,
			xhtml: true
		}),
		new WebpackESLintPlugin(),
		new VueLoaderPlugin()
	];

	return {
		mode: options.mode,
		entry: entries,
		output: {
			path: BUILD_PATH,
			publicPath: "/lottery",
			filename: "[name].js",
			assetModuleFilename: "[hash][ext][query]",
			library: {
				type: "umd",
				name: "ResidenceMozart"
			}
		},
		resolve: {
			extensions: [".js", ".json", ".vue", "*"],
			alias: {
				"~": __dirname,
				"@": SOURCE_PATH,
				"†": TEST_PATH
			}
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: "vue-loader"
				},
				{
					test: /\.js$/,
					exclude: /node_modules|worker/,
					use: [
						"babel-loader"
					]
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						WebpackMiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								esModule: false
							}
						},
						"sass-loader"
					]
				},
				{
					test: /\.(woff2|svg|png)$/,
					type: "asset/resource"
				}
			]
		},
		target: "web",
		devServer: IS_DEV ? server : undefined,
		devtool: IS_DEV ? "source-map" : false,
		optimization: {
			minimize: !IS_DEV
		},
		plugins
	};

};
