'use strict';

const {
   TOWER_SIZE,
   TOWER_BARREL_WIDTH,
   TOWER_BARREL_HEIGHT,
   TOWER_ROTATE_SPEED,
   BASIC_TOWER_COLOR,
   BASIC_TOWER_FOV,
} = require('../../util/constants');
const offset = require('../../util/offset');

function degToRad(deg) {
   return (deg * Math.PI) / 180;
}
module.exports = class Tower {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = Math.round(Math.random() * 360);
      this.rotateSpeed = TOWER_ROTATE_SPEED;
      this.radius = TOWER_SIZE / 2;
      this.color = BASIC_TOWER_COLOR;
      this.fov = BASIC_TOWER_FOV;
   }
   update() {
      this.angle += this.rotateSpeed;
      this.angle = this.angle % 360;
   }
   simulate(state) {
      // do stuff like shoot at enemy
   }
   render(ctx, camera) {
      const pos = offset(this.x, this.y, camera);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(degToRad(this.angle));
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(0, -TOWER_BARREL_HEIGHT / 2, TOWER_BARREL_WIDTH, TOWER_BARREL_HEIGHT);
      ctx.restore();
   }
};
// add towers @param {x , y}
