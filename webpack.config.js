var webpack = require('webpack')
var path = require('path')
var Html = require('html-webpack-plugin')

module.exports = {
  entry: [
    './index.ts'
  ],
  devtool: 'source-map',
  output: {
    filename: 'dist/[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ],
    loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, use: 'ts-loader' }
    ]
  },
  plugins: [new Html()]
}

