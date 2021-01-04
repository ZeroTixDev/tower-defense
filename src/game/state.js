'use strict';

module.exports = class State {
   constructor() {
      this.towers = [];
      this.enemy = [];
   }
   simulate() {
      for (const enemy of this.enemy) {
         enemy.update();
      }
   }
   render(ctx, camera) {
      for (const enemy of this.enemy) {
         enemy.render(ctx, camera);
      }
   }
};
