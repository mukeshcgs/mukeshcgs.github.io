const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//  module.exports = merge(common, {
//   mode: 'development',
//    devtool: 'inline-source-map',
//    devServer: {
//      contentBase: './dist'
//    }
//  });
module.exports = {
  mode: 'development',
  devtool: "eval",
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
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
  ],
};