'use strict';

const { merge } = require('webpack-merge');
const paths = require('./paths');
const { join } = require('path');
const WebpackBar = require('webpackbar');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = { ...common };
config.entry = {
   editor: { import: join(paths.editor, 'index.js'), filename: '[name].[contenthash].bundle.js' },
};
config.plugins = [
   new HtmlWebpackPlugin({
      hash: true,
      title: 'lol',
      template: join(paths.editor, 'template.html'),
      publicPath: './',
      filename: '/index.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new WebpackBar(),
   new CleanWebpackPlugin(),
];
config.output = {
   path: join(paths.build, '/editor'),
   publicPath: '/',
   filename: '[name].[contenthash].bundle.js',
};
module.exports = merge(config, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      historyApiFallback: true,
      contentBase: paths.editor,
      open: true,
      openPage: 'editor',
      compress: true,
      port: 80,
   },
});
