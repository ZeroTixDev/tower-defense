'use strict';
const offset = require('../../util/offset');
const {
   BASIC_BULLET_SIZE,
   BASIC_BULLET_COLOR,
   BASIC_TOWER_DAMAGE,
   GAME_WIDTH,
   GAME_MARGIN,
   GAME_HEIGHT,
} = require('../../util/constants');
module.exports = class Bullet {
   constructor(x, y, speed, angle, radius = BASIC_BULLET_SIZE / 2) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.angle = angle;
      this.xv = Math.cos(this.angle) * this.speed;
      this.yv = Math.sin(this.angle) * this.speed;
      this.color = BASIC_BULLET_COLOR;
      this.radius = radius;
      this.type = 'basic';
      this.update();
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
   }
   render(ctx, camera) {
      const pos = offset(this.x, this.y, camera);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
};
