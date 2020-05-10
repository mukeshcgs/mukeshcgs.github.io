var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const common = require('./webpack/webpack.common');


const envs = {
  development: 'dev',
  production: 'prod',
};
/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./webpack/webpack.${env}.js`);

module.exports = webpackMerge(common, envConfig);

// module.exports = {

//   devtool: "eval",
//   entry: './src/js/index.js',
//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       exclude: /(node_modules|bower_components)/,
//       loader: 'babel-loader',
//       query: {
//         presets: ['react', 'es2015', 'stage-0'],
//         plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
//       }
//     },
//     {
//       test: /\.scss$/,
//       exclude: /node_modules/,
//       use: ExtractTextPlugin.extract({
//         fallback: "style-loader",
//         use: [{
//           loader: "css-loader"
//         }, {
//           loader: "sass-loader"
//         }],
//       })
//     },
//     {
//       test: /\.html$/i,
//       use: 'html-loader'
//     }
//     ]
//   },
//   output: {
//     path: __dirname + "src/js/",
//     filename: "index.min.js"
//   },
//   devServer: {
//     port: 3000,
//     historyApiFallback: true,
//   },
//   plugins: [
//     new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),
//   ],
// };