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
         {
            test: /\.(png|jp(e*)g|svg)$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8000, // Convert images < 8kb to base64 strings
                     name: 'images/[hash]-[name].[ext]',
                  },
               },
            ],
         },
         {
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            loader: 'file-loader',
            options: {
               name: 'music/[hash]-[name].[ext]',
            },
         },
      ],
   },
   plugins,
};
