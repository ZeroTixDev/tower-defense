'use strict';

const enemy = require('../game/enemy/all');
const currentTick = require('./currentTick');
const { GAME } = require('./constants');

module.exports = function spawnEnemy(path, json, game) {
   function calculateTime(ms) {
      return currentTick(game.startTime) + (ms / 1000) * GAME.simulation_rate;
   }
   function spawn(type, amount, time, delay) {
      for (let i = 1; i < amount + 1; i++) {
         game.newEvent(() => {
            game.state.enemy.push(new type(path));
         }, calculateTime(delay + i * time));
      }
   }
   for (const object of json) {
      const { type, amount, delay } = object;
      if (type === 'basic') {
         spawn(enemy.Basic, amount, object['time-in-between-ms'], delay);
      } else if (type === 'fast') {
         spawn(enemy.Fast, amount, object['time-in-between-ms'], delay);
      } else if (type === 'strong') {
         spawn(enemy.Strong, amount, object['time-in-between-ms'], delay);
      }
   }
};
