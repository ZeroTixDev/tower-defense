'use strict';

const enemy = require('../game/enemy/all');
const currentTick = require('./currentTick');
const { SIMULATION_RATE } = require('./constants');

module.exports = function spawnEnemy(path, json, game) {
   const enemyArray = game.state.enemy;
   function calculateTime(ms) {
      return currentTick(game.startTime) + (ms / 1000) * SIMULATION_RATE;
   }
   function spawn(type, amount, time, delay) {
      for (let i = 0; i < amount; i++) {
         game.newEvent(() => {
            enemyArray.push(new type(path));
         }, calculateTime(delay + i * time));
      }
   }
   for (const object of json) {
      const { type, amount, delay } = object;
      if (type === 'basic') {
         spawn(enemy.Basic, amount, object['time-in-between-ms'], delay);
      } else if (type === 'fast') {
         spawn(enemy.Fast, amount, object['time-in-between-ms'], delay);
      }
   }
};
