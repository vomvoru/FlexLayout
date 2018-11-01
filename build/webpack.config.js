const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-root-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const publicConfig = require('./publicConfig');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  entry: '../src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: '../dist',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ReactRootPlugin(publicConfig.ROOT_TAG_ID),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(publicConfig),
    }),
  ],
});
