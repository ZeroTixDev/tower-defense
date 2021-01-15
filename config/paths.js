'use strict';

const path = require('path');

module.exports = {
   build: path.resolve(__dirname, '../dist'),
   game: path.resolve(__dirname, '../src/game'),
   editor: path.resolve(__dirname, '../src/editor'),
   images: path.resolve(__dirname, '../assets/images'),
   src: path.resolve(__dirname, '../src'),
};
