'use strict';

const paths = require('./paths');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const plugins = [
   new HtmlWebpackPlugin({
      hash: true,
      title: 'lol',
      template: paths.game + '/template.html',
      filename: './index.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new HtmlWebpackPlugin({
      hash: true,
      title: 'lol',
      template: paths.editor + '/template.html',
      filename: './editor/index.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new CleanWebpackPlugin(),
   new WebpackBar(),
];
module.exports = {
   /* entry: {
      game: { import: paths.game + '/index.js', filename: 'game/[name].[contenthash].bundle.js' },
      editor: { import: paths.editor + '/index.js', filename: 'editor/[name].[contenthash].bundle.js' },
   },*/
   entry: paths.game + '/index.js',
   mode: 'development',
   devtool: 'source-map',
   output: {
      path: paths.build,
      publicPath: '/',
      filename: '[name].[contenthash].bundle.js',
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
      ],
   },
   plugins,
};
