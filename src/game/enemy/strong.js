'use strict';

const Basic = require('./basic');
const { STRONG_ENEMY_COLOR } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, speed = 4, size = 55) {
      super(path, speed, size);
      this.color = STRONG_ENEMY_COLOR;
      this.type = 'Strong';
   }
};
