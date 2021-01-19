'use strict';

const { GAME } = require('./constants');
module.exports = function currentTick(startTime) {
   return Math.ceil((window.performance.now() - startTime) * (GAME.simulation_rate / 1000));
};
