const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    app: './src/js/index.js'
  },
  module: {
    rules: [
      {
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
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      template: '!html-webpack-plugin/lib/loader!src/index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),

  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};