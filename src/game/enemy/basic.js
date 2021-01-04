'use strict';

const { PATH_SIZE, BASIC_ENEMY_COLOR } = require('../../util/constants');
const offset = require('../../util/offset');

module.exports = class Enemy {
   constructor(path, speed = 5, size = PATH_SIZE - 10) {
      this.pathIndex = 1;
      this.path = path;
      this.x = this.lastPath.x;
      this.y = this.lastPath.y;
      this.radius = size / 2;
      this.speed = speed;
      this.color = BASIC_ENEMY_COLOR;
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
      if (this.onPath) {
         this.pathIndex++;
         this.x = this.lastPath.x;
         this.y = this.lastPath.y;
         if (!this.currentPath) {
            this.dead = true;
         } else {
            this.calculateVelocity();
         }
      }
      this.x += this.xv;
      this.y += this.yv;
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
      drawPlayer(this.x, this.y, this.color);
   }
   get lastPath() {
      return this.path[this.pathIndex - 1];
   }
   get onPath() {
      return (
         Math.abs(this.currentPath.x - this.roundPos.x) < this.speed &&
         Math.abs(this.currentPath.y - this.roundPos.y) < this.speed
      );
   }
   get nextPath() {
      return this.path[this.pathIndex + 1];
   }
   get currentPath() {
      return this.path[this.pathIndex];
   }
};
