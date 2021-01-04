'use strict';

const enemy = require('../game/enemy/all');
module.exports = function spawnEnemy(enemyArray, path, json) {
   function spawn(type, amount, time, delay, randomTime) {
      setTimeout(() => {
         for (let i = 0; i < amount; i++) {
            setTimeout(() => {
               enemyArray.push(new type(path));
            }, i * time + Math.random() * randomTime);
         }
      }, delay);
   }
   for (const object of json) {
      console.log(object);
      const { type, amount, delay } = object;
      if (type === 'basic') {
         spawn(enemy.Basic, amount, object['time-in-between-ms'], delay, object['random-time']);
      } else if (type === 'fast') {
         spawn(enemy.Fast, amount, object['time-in-between-ms'], delay, object['random-time']);
      }
   }
};
