'use strict';

const Basic = require('./basic');
const { STRONG_ENEMY } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, speed = STRONG_ENEMY.speed, size = STRONG_ENEMY.size, health = STRONG_ENEMY.health) {
      super(path, speed, size, health);
      this.color = STRONG_ENEMY.color;
      this.type = STRONG_ENEMY.name;
   }
};
