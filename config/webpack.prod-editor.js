'use strict';

const { merge } = require('webpack-merge');
const { join } = require('path');
const paths = require('./paths');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const config = { ...common };
config.entry = {
   editor: { import: join(paths.editor, 'index.js'), filename: 'editor/js/[name].[contenthash].bundle.js' },
};
config.plugins = [
   new HtmlWebpackPlugin({
      hash: true,
      title: 'lol',
      template: join(paths.editor, 'template.html'),
      filename: './editor/index.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new WebpackBar(),
];
module.exports = merge(config, {
   mode: 'production',
   devtool: false,
});
