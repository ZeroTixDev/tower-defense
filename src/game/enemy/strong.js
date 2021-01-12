'use strict';

const Basic = require('./basic');
const {
   STRONG_ENEMY_COLOR,
   STRONG_ENEMY_SPEED,
   STRONG_ENEMY_SIZE,
   STRONG_ENEMY_HEALTH,
} = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, speed = STRONG_ENEMY_SPEED, size = STRONG_ENEMY_SIZE, health = STRONG_ENEMY_HEALTH) {
      super(path, speed, size, health);
      this.color = STRONG_ENEMY_COLOR;
      this.type = 'Strong';
   }
};
