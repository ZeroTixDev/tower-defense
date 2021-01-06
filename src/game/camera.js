'use strict';

const { GAME_WIDTH, GAME_HEIGHT } = require('../util/constants');
module.exports = class Camera {
   constructor(x = GAME_WIDTH / 2, y = GAME_HEIGHT / 2, speed = 2) {
      this.x = x;
      this.y = y;
      this.speed = speed;
   }
   interp(x, y, delta) {
      this.x += (x - this.x) * 0.5 * delta * this.speed;
      this.y += (y - this.y) * 0.5 * delta * this.speed;
   }
   setTo(x, y) {
      this.x = x;
      this.y = y;
   }
};
