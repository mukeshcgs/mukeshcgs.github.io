const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let titles = {
  index: "Home",
  about: "About us",
  blog: "Blog"
};

// console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
// console.log('Production: ', env.production); // true

module.exports = {

  entry: {
    index: './src/js/index.js',
  },
  mode: 'development',
  module: {
    rules: [{
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
      },

      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },

      {
        test: /\.(html)$/,
        use: {
          loader: 'ractive',
        }
      },

      {
        test: /\.handlebars$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.modernizrrc.js$/,
        use: ['modernizr-loader']
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: ['modernizr-loader', 'json-loader']
      }
    ]
  },

  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, "private/.modernizrrc"),
      "barba": path.resolve('node_modules', 'barba.js/dist/barba.min'),
    }
  },

  devServer: {
    historyApiFallback: true,
  },

  // devServer: {
  //   historyApiFallback: true,
  //   noInfo: true,
  //   proxy: {
  //     '*': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //       secure: false,
  //       cookieDomainRewrite: '',
  //       onProxyReq: function (request, req, res) {
  //         request.setHeader('origin', 'http://localhost:8080')
  //       }
  //     },
  //   }
  // },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: '!html-webpack-plugin/lib/loader!src/index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: false,
      allChunks: true
    }),
    new webpack.NormalModuleReplacementPlugin(/^ractive$/, 'ractive/ractive.min')
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};