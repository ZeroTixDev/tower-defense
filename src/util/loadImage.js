'use strict';

module.exports = function loadImage(path) {
   const image = new Image();
   image.src = require('../../assets/' + path).default;
   return image;
};
