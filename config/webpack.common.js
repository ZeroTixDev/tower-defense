'use strict';

const { join } = require('path');
const paths = require('./paths');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const plugins = [
   new HtmlWebpackPlugin({
      hash: true,
      title: 'lol',
      template: join(paths.game, 'template.html'),
      filename: './game/index.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new CleanWebpackPlugin(),
   new WebpackBar(),
];
module.exports = {
   entry: {
      game: { import: join(paths.game, 'index.js'), filename: 'game/js/[name].[contenthash].bundle.js' },
   },
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
