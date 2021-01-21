'use strict';

const { join } = require('path');
const paths = require('./paths');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const plugins = [
   new HtmlWebpackPlugin({
      hash: true,
      title: 'Tower Defense',
      favicon: join(paths.images, 'logo.png'),
      template: join(paths.game, 'template.html'),
      filename: './index.html',
      publicPath: './',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new HtmlWebpackPlugin({
      hash: true,
      title: '404',
      inject: false,
      template: join(paths.src, '404.html'),
      filename: './404.html',
      publicPath: './',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new HtmlWebpackPlugin({
      hash: true,
      title: 'Tower Defense',
      favicon: join(paths.images, 'logo.png'),
      template: join(paths.editor, 'template.html'),
      publicPath: './',
      filename: './editor.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new CleanWebpackPlugin(),
   new WebpackBar(),
];
module.exports = {
   entry: join(paths.game, 'index.js'),
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
               name: 'sounds/[hash]-[name].[ext]',
            },
         },
      ],
   },
   plugins,
};
