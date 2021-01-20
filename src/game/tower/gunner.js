'use strict';

const Basic = require('./basic');
const { GUNNER_TOWER, GUNNER_BULLET } = require('../../util/constants');

module.exports = class Pounder extends Basic {
   constructor(x, y, object = GUNNER_TOWER, bullet = GUNNER_BULLET) {
      super(x, y, object, bullet);
   }
};
