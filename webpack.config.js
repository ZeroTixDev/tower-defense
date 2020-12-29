'use strict';
const path = require('path');
/* const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const plugins = [
   new HtmlWebpackPlugin({
      hash: true,
      title: 'lol',
      template: './src/template.html',
      filename: './index.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new CleanWebpackPlugin(),
   /* new BundleAnalyzerPlugin(), */
];
module.exports = {
   entry: './src/index.js',
   mode: 'development',
   devtool: 'source-map',
   output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
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
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
   },
};
