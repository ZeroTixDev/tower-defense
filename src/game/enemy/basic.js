'use strict';

const { PATH_SIZE } = require('../../util/constants');
module.exports = class Enemy {
   constructor(path, speed = 5, size = PATH_SIZE) {
      this.pathIndex = 0;
      this.path = path;
      this.x = this.currentPath.x;
      this.y = this.currentPath.y;
      this.radius = size / 2;
      this.speed = speed;
   }
   update() {
      this.x += (this.nextPath.x - this.x) / this.speed;
      this.y += (this.nextPath.y - this.y) / this.speed;
      if (this.onPath) {
         this.pathIndex++;
      }
   }
   render(ctx) {
      ctx.fillStyle = 'gray';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
   }
   get onPath() {
      return this.x === this.nextPath.x && this.y === this.nextPath.y;
   }
   get nextPath() {
      return this.path[this.pathIndex + 1];
   }
   get currentPath() {
      return this.path[this.pathIndex];
   }
};
