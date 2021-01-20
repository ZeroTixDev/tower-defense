'use strict';
const offset = require('../../util/offset');
const { GAME } = require('../../util/constants');

module.exports = class Bullet {
   constructor(x, y, speed, angle, turretDistance, range, damage, stats) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.angle = angle;
      this.xv = Math.cos(this.angle) * this.speed;
      this.yv = Math.sin(this.angle) * this.speed;
      this.color = stats.color;
      this.radius = (stats.size + Math.random() * stats.size_randomness) / 2;
      this.type = stats.name;
      this.x += this.xv * turretDistance;
      this.y += this.yv * turretDistance;
      this.range = range;
      this.traveled = 0;
      this.opacity = 1;
      this.damage = damage;
   }
   get offScreen() {
      return (
         this.x - this.radius < -GAME.margin ||
         this.x + this.radius > GAME.width + GAME.margin ||
         this.y + this.radius > GAME.height + GAME.margin ||
         this.y - this.radius < -GAME.margin
      );
   }
   update() {
      this.x += this.xv;
      this.y += this.yv;
      this.traveled += this.speed;
      if (this.traveled > this.range / 2) {
         this.opacity -= 2 / GAME.simulation_rate;
         if (this.opacity <= 0) {
            this.delete = true;
         }
      }
   }
   render(ctx, camera) {
      const pos = offset(this.x, this.y, camera);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
   }
};
