'use strict';

const Basic = require('./basic');
const { STRONG_ENEMY } = require('../../util/constants');

module.exports = class Enemy extends Basic {
   constructor(path, stats = STRONG_ENEMY) {
      super(path, stats);
   }
};
