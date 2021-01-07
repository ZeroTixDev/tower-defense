'use strict';
const { GAME_WIDTH, GAME_HEIGHT } = require('./constants');

module.exports = function offset(x, y, camera) {
   return {
      x: Math.round((x - camera.x) * camera.scale + GAME_WIDTH / 2),
      y: Math.round((y - camera.y) * camera.scale + GAME_HEIGHT / 2),
   };
};
