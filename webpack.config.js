var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

var config = require('./config.json');
config = config[config.env];

var plugins = [];

if(config.minify){
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

if(config.gzip){
  plugins.push(
    new CompressionPlugin({
           asset: "{file}",
           algorithm: "gzip",
           regExp: /\.js$|\.html$/,
           threshold: 10240,
           minRatio: 0.8
       })
     );
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'static/js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: '/(node_modules|bower_components)/',
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: plugins
};
