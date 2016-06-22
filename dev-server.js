var path = require('path');
var express = require('express');
var webpack = require('webpack');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');



var port = 8080;

var config = {
    devtool: 'eval',
    watch: true,
    entry: {
        'components/commons/index': ['webpack-hot-middleware/client', './components/commons/index.js'],
        'pages/test/index': ['webpack-hot-middleware/client', './pages/test/index.js']
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                'components/commons/index'
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'pages/test/index.html',
            template: 'pages/test/index.html',
            chunks: [
                'components/commons/index',
                'pages/test/index'
            ],
            inject: 'body',
            chunksSortMode: 'dependency'
        })
    ],
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css'),
            exclude: /node_modules/
        }]
    },
    vue: {
        autoprefixer: {
            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 8']
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        extensions: ['', '.js', '.vue']
    }
};

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
