'use strict';

const Basic = require('./basic');
const { POUNDER_TOWER, POUNDER_BULLET } = require('../../util/constants');
const Bullet = require('../bullet/pounder');

module.exports = class Pounder extends Basic {
   constructor(x, y, object = POUNDER_TOWER) {
      super(x, y, object);
      this.bulletSpeed = POUNDER_BULLET.speed;
      this.bullet = {
         object: Bullet,
         stats: POUNDER_BULLET,
      };
   }
};
