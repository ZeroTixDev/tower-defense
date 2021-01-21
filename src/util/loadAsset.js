'use strict';

module.exports = {
   loadImage: function loadImage(path) {
      const image = new Image();
      image.src = require('../../assets/images/' + String(path)).default;
      return image;
   },
   loadSound: function loadSound(path) {
      const audio = new Audio();
      audio.src = require('../../assets/sounds/' + String(path)).default;
      return audio;
   },
};
