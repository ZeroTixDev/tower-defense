'use strict';

const { GAME_WIDTH, GAME_HEIGHT } = require('../util/constants');
module.exports = class Camera {
   constructor(x = GAME_WIDTH / 2, y = GAME_HEIGHT / 2, speed = 5) {
      this.x = x;
      this.y = y;
      this.scale = 1;
      this.scalingBounds = [0.2, 20];
      this.speed = speed;
   }
   zoomIn() {
      this.scale += 0.2;
      this.scale = Math.min(this.scalingBounds[1], Math.round(this.scale));
   }
   zoomOut() {
      this.scale -= 0.2;
      this.scale = Math.max(this.scalingBounds[0], Math.round(this.scale));
   }
   interp(x, y, delta) {
      if (delta > 1) {
         this.x += (x - this.x) * 0.6;
         this.y += (y - this.y) * 0.6;
      } else {
         this.x += (x - this.x) * 0.6 * delta * this.speed;
         this.y += (y - this.y) * 0.6 * delta * this.speed;
      }
   }
   setTo(x, y) {
      this.x = x;
      this.y = y;
   }
};
