'use strict';

const { SPOT_SIZE, TOWER_ROTATE_SPEED } = require('../../util/constants');

function degToRad(deg) {
   return (deg * Math.PI) / 180;
}
module.exports = class Tower {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = 0;
      this.rotateSpeed = TOWER_ROTATE_SPEED;
      this.radius = SPOT_SIZE / 2;
   }
   update(delta) {
      this.angle += this.rotateSpeed * delta;
      this.angle = this.angle % 360;
   }
   simulate(state) {
      // do stuff like shoot at enemy
   }
};
// add towers @param {x , y}
