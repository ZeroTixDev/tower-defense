'use strict';

const Basic = require('./basic');
const { POUNDER_TOWER, POUNDER_BULLET } = require('../../util/constants');

module.exports = class Pounder extends Basic {
   constructor(x, y, object = POUNDER_TOWER, bullet = POUNDER_BULLET) {
      super(x, y, object, bullet);
   }
};
