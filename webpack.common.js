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

  resolve: {
    alias: {
      $: "jquery/src/jquery",
    }
  },
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
    { test: /\.jpg$/, use: ["file-loader"] },
    { test: /\.png$/, use: ["url-loader?mimetype=image/png"] },
    {
      test: /\.(html)$/,
      exclude: [/node_modules/, require.resolve('./index.html')],
      use: {
        loader: 'html-loader',
        options: {
          attrs: [':data-src']
        }
      }
    },
    {
      test: /\.modernizrrc.js$/,
      use: ['modernizr-loader']
    },
    {
      test: /\.modernizrrc(\.json)?$/,
      use: ['modernizr-loader', 'json-loader']
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    },
    ]
  },

  resolve: {
    modules: ['node_modules'],
    alias: {
      modernizr$: path.resolve(__dirname, "private/.modernizrrc"),
      "barba": path.resolve('node_modules', 'barba.js/dist/barba.min'),
      'TweenLite': 'gsap/src/minified/TweenLite.min.js',
      'TweenMax': 'gsap/src/minified/TweenMax.min.js',
      'TimelineLite': 'gsap/src/minified/TimelineLite.min.js',
      'TimelineMax': 'gsap/src/minified/TimelineMax.min.js',
      'ScrollMagic': 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
      'animation.gsap': 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
      'debug.addIndicators': 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
    }
  },

  devServer: {
    historyApiFallback: true,
  },

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
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};