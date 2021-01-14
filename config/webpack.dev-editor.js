'use strict';

const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      historyApiFallback: true,
      contentBase: paths.build,
      open: true,
      compress: true,
      port: 80,
      openPage: 'editor.html',
   },
});
