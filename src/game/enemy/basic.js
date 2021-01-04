'use strict';

const { PATH_SIZE } = require('../../util/constants');
const offset = require('../../util/offset');

module.exports = class Enemy {
   constructor(path, speed = 10, size = PATH_SIZE - 5) {
      this.pathIndex = 1;
      this.path = path;
      this.x = this.lastPath.x;
      this.y = this.lastPath.y;
      this.radius = size / 2;
      this.speed = speed;
      this.calculateVelocity();
   }
   lerp(start, end, time) {
      return start * (1 - time) + end * time;
   }
   findAngle() {
      return Math.atan2(this.currentPath.y - this.lastPath.y, this.currentPath.x - this.lastPath.x);
   }
   calculateVelocity() {
      this.angle = this.findAngle();
      this.xv = this.speed * Math.cos(this.angle);
      this.yv = this.speed * Math.sin(this.angle);
   }
   update() {
      this.x += this.xv;
      this.y += this.yv;
      if (this.onPath) {
         this.pathIndex++;
         console.log('next path');
         if (!this.nextPath) {
            this.pathIndex = 0;
         }
         this.calculateVelocity();
      }
   }
   get roundPos() {
      return { x: Math.round(this.x), y: Math.round(this.y) };
   }
   render(ctx, camera) {
      const radius = this.radius;
      function drawPlayer(x, y, fill) {
         ctx.fillStyle = fill;
         ctx.beginPath();
         const pos = offset(x, y, camera);
         ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
         ctx.fill();
      }
      drawPlayer(this.x, this.y, 'gray');
      drawPlayer(this.lastPath.x, this.lastPath.y, 'blue');
      drawPlayer(this.currentPath.x, this.currentPath.y, 'red');
      drawPlayer(this.nextPath.x, this.nextPath.y, 'green');
   }
   get lastPath() {
      return this.path[this.pathIndex - 1];
   }
   get onPath() {
      return this.currentPath.x - this.roundPos.x < 1 && this.currentPath.y - this.roundPos.y < 1;
   }
   get nextPath() {
      return this.path[this.pathIndex + 1];
   }
   get currentPath() {
      return this.path[this.pathIndex];
   }
};
