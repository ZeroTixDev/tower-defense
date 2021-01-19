'use strict';

const Basic = require('./basic');
const { FAST_ENEMY } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, stats = FAST_ENEMY) {
      super(path, stats);
   }
};
