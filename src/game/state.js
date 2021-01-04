'use strict';

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
   render(ctx, camera) {
      for (const enemy of this.enemy) {
         enemy.render(ctx, camera);
      }
   }
};
