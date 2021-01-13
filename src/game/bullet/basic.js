'use strict';
const offset = require('../../util/offset');
const {
   BASIC_BULLET_SIZE,
   BASIC_BULLET_COLOR,
   BASIC_TOWER_DAMAGE,
   GAME_WIDTH,
   GAME_MARGIN,
   GAME_HEIGHT,
   SIMULATION_RATE,
} = require('../../util/constants');
module.exports = class Bullet {
   constructor(x, y, speed, angle, turretDistance, range, radius = BASIC_BULLET_SIZE / 2) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.angle = angle;
      this.xv = Math.cos(this.angle) * this.speed;
      this.yv = Math.sin(this.angle) * this.speed;
      this.color = BASIC_BULLET_COLOR;
      this.radius = radius;
      this.type = 'basic';
      this.x += this.xv * turretDistance;
      this.y += this.yv * turretDistance;
      this.range = range;
      this.traveled = 0;
      this.opacity = 1;
   }
   get damage() {
      return Math.round(BASIC_TOWER_DAMAGE + Math.random() * 5);
   }
   get offScreen() {
      return (
         this.x - this.radius < -GAME_MARGIN ||
         this.x + this.radius > GAME_WIDTH + GAME_MARGIN ||
         this.y + this.radius > GAME_HEIGHT + GAME_MARGIN ||
         this.y - this.radius < -GAME_MARGIN
      );
   }
   update() {
      this.x += this.xv;
      this.y += this.yv;
      this.traveled += this.speed;
      if (this.traveled > this.range / 2) {
         this.opacity -= 2 / SIMULATION_RATE;
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
