'use strict';
const { GAME } = require('./constants');

module.exports = function offset(x, y, camera) {
   return {
      x: Math.round((x - camera.x) * camera.scale + GAME.width / 2),
      y: Math.round((y - camera.y) * camera.scale + GAME.height / 2),
   };
};
