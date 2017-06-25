"use strict";

const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/src',
  entry: {
    js: './client.js',
  },
  devServer: {
    open: true,
    contentBase: __dirname + '/src'
  },
  output: {
    path: path.resolve(__dirname, 'static', 'js'),
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['babel-preset-react', 'babel-preset-es2015'].map(require.resolve)
        }
      }
    ],
  }
  
  
  
};
