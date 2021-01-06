'use strict';

const { SPAWNER_COLOR, SPAWNER_SIZE } = require('../util/constants');
const offset = require('../util/offset');
module.exports = class State {
   constructor() {
      this.towers = [];
      this.enemy = [];
   }
   simulate() {
      for (let i = this.enemy.length - 1; i >= 0; i--) {
         const enemy = this.enemy[i];
         enemy.update();
         if (enemy.dead) {
            this.enemy.splice(i, 1);
         }
      }
   }
   render(ctx, camera, path) {
      for (const enemy of this.enemy) {
         enemy.render(ctx, camera);
      }
      ctx.fillStyle = SPAWNER_COLOR;
      ctx.beginPath();
      const start = offset(path[0].x, path[0].y, camera);
      ctx.arc(start.x, start.y, SPAWNER_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      const end = offset(path[path.length - 1].x, path[path.length - 1].y, camera);
      ctx.arc(end.x, end.y, SPAWNER_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
   }
};
