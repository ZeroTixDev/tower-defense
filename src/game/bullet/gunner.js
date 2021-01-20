'use strict';
const Basic = require('./basic');

module.exports = class Bullet extends Basic {
   constructor(x, y, speed, angle, turretDistance, range, damage, stats) {
      super(x, y, speed, angle, turretDistance, range, damage, stats);
   }
};
