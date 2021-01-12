'use strict';

module.exports = function round(value, decimals) {
   return Math.round(value * 10 ** decimals) / 10 ** decimals;
};
