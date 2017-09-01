var webpack = require('webpack')
var path = require('path')
var Html = require('html-webpack-plugin')
var Fail = require('webpack-fail-plugin');

module.exports = {
  entry: [
    './index.js'
  ],
  //devtool: 'source-map',
  output: {
    filename: 'dist/[name].js',
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      //{
      //  test: /\.js$/,
      //  use: ["source-map-loader"],
      //  enforce: "pre"
      //},
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
    ],
  },
  plugins: [new Html(), Fail]
}

