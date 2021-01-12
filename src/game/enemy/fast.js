'use strict';

const Basic = require('./basic');
const { FAST_ENEMY_COLOR, FAST_ENEMY_SPEED, FAST_ENEMY_SIZE, FAST_ENEMY_HEALTH } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, speed = FAST_ENEMY_SPEED, size = FAST_ENEMY_SIZE, health = FAST_ENEMY_HEALTH) {
      super(path, speed, size, health);
      this.color = FAST_ENEMY_COLOR;
      this.type = 'Fast';
   }
};
