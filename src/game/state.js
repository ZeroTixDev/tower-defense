'use strict';

const { PATH_ENDS_COLOR, PATH_ENDS_SIZE } = require('../util/constants');
const offset = require('../util/offset');
module.exports = class State {
   constructor() {
      this.towers = [];
      this.enemy = [];
      this.spots = [];
   }
   simulate(mouse, camera) {
      for (let i = this.enemy.length - 1; i >= 0; i--) {
         const enemy = this.enemy[i];
         enemy.update();
         if (enemy.dead) {
            this.enemy.splice(i, 1);
         }
      }
      for (const spot of this.spots) {
         spot.update(mouse, camera);
      }
   }
   render(ctx, camera, path) {
      for (const enemy of this.enemy) {
         enemy.render(ctx, camera);
      }
      for (const spot of this.spots) {
         spot.render(ctx, camera);
      }
      ctx.fillStyle = PATH_ENDS_COLOR;
      ctx.beginPath();
      const start = offset(path[0].x, path[0].y, camera);
      ctx.arc(start.x, start.y, (PATH_ENDS_SIZE / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      const end = offset(path[path.length - 1].x, path[path.length - 1].y, camera);
      ctx.arc(end.x, end.y, (PATH_ENDS_SIZE / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
};
