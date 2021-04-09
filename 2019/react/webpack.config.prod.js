var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    //     node: {
    //     fs: "empty"
    //  },
    devServer: {
        historyApiFallback: true,
        // This will make the server understand "/some-link" routs instead of "/#/some-link"
    },
    entry: [
        './src/js/index.js'     
        // This is where Webpack will be looking for the entry index.js file
    ],
    output: {
        path: path.join(__dirname, 'build'),
        // This is used to specify folder for producion bundle
        filename: 'index.min.js',
        // Filename for production bundle
        publicPath: '/'
    },
    resolve: {
        modules: [
            'node_modules',
            'src',
            path.resolve(__dirname, 'src/js'),
            path.resolve(__dirname, 'node_modules')
        ], // Folders where Webpack is going to look for files to bundle together
        extensions: ['.jsx', '.js'] // Extensions that Webpack is going to expect
    },
    module: {
        // Loaders allow you to preprocess files as you require() or “load” them. 
        // Loaders are kind of like “tasks” in other build tools, and provide a powerful way to handle frontend build steps.
        loaders: [
            {
                test: /\.jsx?$/, // Here we're going to use JS for react components but including JSX in case this extension is preferable
                include: [
                    path.resolve(__dirname, "src"),
                ],
                loader: ['react-hot-loader']
            },
            {
                loader: "babel-loader",

                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, "src"),
                ],

                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,

                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            }
        ]
    },
    plugins: [
        new Visualizer({
            filename: './statistics.html'
        }),



        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        new webpack.NoEmitOnErrorsPlugin(), // Webpack will let you know if there are any errors

        // Declare global variables
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            _: 'lodash'
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            hash: true
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        }),
    ]
}