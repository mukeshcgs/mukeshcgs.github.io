var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var debug = process.env.NODE_ENV !== "production";
var path = require('path');

module.exports = {
  //     node: {
  //     fs: "empty"
  //  },
  devtool: "eval",
  entry: './src/js/index.js',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
      }
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
      })
    },
    {
      test: /\.html$/i,
      use: 'html-loader'
    }
    ]
  },
  output: {
    path: __dirname + "src/js/",
    filename: "index.min.js"
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),

    // have Webpack copy over the index.html and inject appropriate script tag for Webpack-bundled entry point 'main.js'
    // new HtmlWebpackPlugin({
    //   template: '!html-webpack-plugin/lib/loader!index.html',
    //   filename: 'src/index.html'
    // })
    // extractSass,
    // new ExtractTextPlugin({
    //   filename: 'bundle.css',
    //   allChunks: true,
    //   disable: process.env.NODE_ENV !== 'production'
    // }),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};