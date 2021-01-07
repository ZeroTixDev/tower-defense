'use strict';

const { GAME_WIDTH, GAME_HEIGHT } = require('../util/constants');
module.exports = class Camera {
   constructor(x = GAME_WIDTH / 2, y = GAME_HEIGHT / 2, speed = 5) {
      this.x = x;
      this.y = y;
      this.scale = 0.8;
      this.scalingBounds = [0.2, 20];
      this.speed = speed;
      this.up = false;
      this.down = false;
      this.left = false;
      this.right = false;
      this.xv = 0;
      this.yv = 0;
      this.friction = 0.8;
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
      if (this.static) {
         this.x = GAME_WIDTH / 2;
         this.y = GAME_HEIGHT / 2;
      } else {
         if (delta > 1) {
            this.x += (x - this.x) * 0.6;
            this.y += (y - this.y) * 0.6;
         } else {
            this.x += (x - this.x) * 0.6 * delta * this.speed;
            this.y += (y - this.y) * 0.6 * delta * this.speed;
         }
      }
   }
   update(delta) {
      if (this.static) {
         this.x = GAME_WIDTH / 2;
         this.y = GAME_HEIGHT / 2;
      } else {
         console.log('updating not static');
         if (this.up && !this.down) {
            this.yv -= this.speed * delta * 60;
         } else if (this.down && !this.up) {
            this.yv += this.speed * delta * 60;
         }
         if (this.left && !this.right) {
            this.xv -= this.speed * delta * 60;
         } else if (this.right && !this.left) {
            this.xv += this.speed * delta * 60;
         }
         this.xv *= Math.pow(this.friction, delta * 60);
         this.yv *= Math.pow(this.friction, delta * 60);
         this.x += this.xv;
         this.y += this.yv;
      }
   }
   setTo(x, y) {
      this.x = x;
      this.y = y;
   }
};
