'use strict';

const Basic = require('./basic');
const { FAST_ENEMY } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, speed = FAST_ENEMY.speed, size = FAST_ENEMY.size, health = FAST_ENEMY.health) {
      super(path, speed, size, health);
      this.color = FAST_ENEMY.color;
      this.type = FAST_ENEMY.name;
   }
};
