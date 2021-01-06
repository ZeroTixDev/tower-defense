'use strict';

const Basic = require('./basic');
const { PATH_SIZE, FAST_ENEMY_COLOR } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, speed = 7, size = PATH_SIZE - 15) {
      super(path, speed, size);
      this.color = FAST_ENEMY_COLOR;
   }
};
