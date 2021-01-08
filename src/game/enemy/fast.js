'use strict';

const Basic = require('./basic');
const { FAST_ENEMY_COLOR } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, speed = 7, size = 45) {
      super(path, speed, size);
      this.color = FAST_ENEMY_COLOR;
      this.type = 'Fast';
   }
};
