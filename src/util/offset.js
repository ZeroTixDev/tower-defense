'use strict';
const { GAME_WIDTH, GAME_HEIGHT } = require('./constants');

module.exports = function offset(x, y, camera) {
   return {
      x: Math.round(x - camera.x + GAME_WIDTH / 2),
      y: Math.round(y - camera.y + GAME_HEIGHT / 2),
   };
};
