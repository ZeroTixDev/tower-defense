'use strict';

const { GAME_WIDTH, GAME_HEIGHT } = require('./constants');
module.exports = class Camera {
   constructor(x = GAME_WIDTH / 2, y = GAME_HEIGHT / 2) {
      this.x = x;
      this.y = y;
   }
   interp(x, y, delta) {
      this.x += (x - this.x) * delta;
      this.y += (y - this.y) * delta;
   }
   setTo(x, y) {
      this.x = x;
      this.y = y;
   }
};
