'use strict';

const { SIMULATION_RATE } = require('./constants');
module.exports = function currentTick(startTime) {
   return Math.ceil((window.performance.now() - startTime) * (SIMULATION_RATE / 1000));
};
