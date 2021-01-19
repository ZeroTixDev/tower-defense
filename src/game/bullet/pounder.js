'use strict';
const offset = require('../../util/offset');
const { GAME } = require('../../util/constants');
const Basic = require('./basic');

module.exports = class Bullet extends Basic {
   constructor(x, y, speed, angle, turretDistance, range, damage, stats) {
      super(x, y, speed, angle, turretDistance, range, damage, stats);
   }
};
