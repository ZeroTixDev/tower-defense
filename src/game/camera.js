'use strict';

const { GAME } = require('../util/constants');
const round = require('../util/round');

module.exports = class Camera {
   constructor(x = GAME.width / 2, y = GAME.height / 2, speed = 2.5) {
      this.x = x;
      this.y = y;
      this.scale = 0.8;
      this.scalingBounds = [0.2, 20];
      this.speed = speed;
      this.xv = 0;
      this.yv = 0;
      this.friction = 0.4;
   }
   zoomIn() {
      this.scale += 0.2;
      // this.scale = Math.min(this.scalingBounds[1], Math.round(this.scale));
      this.scale = round(this.scale, 2) >= this.scalingBounds[1] ? this.scalingBounds[0] : round(this.scale, 2);
   }
   zoomOut() {
      this.scale -= 0.2;
      this.scale = round(this.scale, 2) <= this.scalingBounds[0] ? this.scalingBounds[0] : round(this.scale, 2);
      // this.scale = Math.max(this.scalingBounds[0], Math.round(this.scale));
   }
   interp(x, y, delta) {
      this.xv += (x - this.x) * 0.45 * delta * this.speed;
      this.yv += (y - this.y) * 0.45 * delta * this.speed;
      this.xv += (GAME.width / 2 - this.x) * 0.9 * delta * this.speed * 5;
      this.yv += (GAME.height / 2 - this.y) * 0.9 * delta * this.speed * 5;
      this.xv *= Math.pow(this.friction, delta * GAME.simulation_rate);
      this.yv *= Math.pow(this.friction, delta * GAME.simulation_rate);
      this.x += this.xv;
      this.y += this.yv;
   }
   setTo(x, y) {
      this.x = x;
      this.y = y;
   }
};
