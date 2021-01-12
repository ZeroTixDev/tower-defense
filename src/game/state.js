'use strict';

const { PATH_ENDS_COLOR, PATH_ENDS_SIZE, GAME_HEIGHT } = require('../util/constants');
const offset = require('../util/offset');
module.exports = class State {
   constructor() {
      this.enemy = [];
      this.spots = [];
      this.wave = 1;
      this.waveLocation = { x: 0, y: 0 };
   }
   intersect(pos, mouse, radius, camera) {
      const offsetPos = offset(pos.x, pos.y, camera);
      const distX = mouse.x - offsetPos.x;
      const distY = mouse.y - offsetPos.y;
      if (Math.abs(distX) > 50 || Math.abs(distY) > 50) {
         return false;
      }
      const distance = Math.sqrt(distX * distX + distY * distY);
      return distance < radius * 2;
   }
   simulate(mouse, camera) {
      let enemyOnMouse = null;
      for (let i = this.enemy.length - 1; i >= 0; i--) {
         const enemy = this.enemy[i];
         enemy.update();
         enemy.showStats = false;
         if (enemyOnMouse === null && this.intersect({ x: enemy.x, y: enemy.y }, mouse, enemy.radius, camera)) {
            enemyOnMouse = i;
         }
         if (enemy.dead) {
            this.enemy.splice(i, 1);
         }
      }
      if (enemyOnMouse != null) {
         this.enemy[enemyOnMouse].showStats = true;
      }
      for (const spot of this.spots) {
         spot.update(mouse, camera);
      }
   }
   handleMouseDown(mouse, camera) {
      let spotOnMouse = null;
      for (let i = this.spots.length - 1; i >= 0; i--) {
         const spot = this.spots[i];
         spot.showData = null;
         if (spotOnMouse === null && this.intersect({ x: spot.x, y: spot.y }, mouse, spot.radius, camera)) {
            spotOnMouse = i;
         }
      }
      if (spotOnMouse != null) {
         const spot = this.spots[spotOnMouse];
         if (spot.y < GAME_HEIGHT / 2 + GAME_HEIGHT / 10) {
            spot.showData = 'down';
         } else {
            spot.showData = 'up';
         }
      }
   }
   drawPathEnds(ctx, camera, path) {
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
   drawWaveText(ctx, camera) {
      const pos = offset(this.waveLocation.x, this.waveLocation.y, camera);
      ctx.font = '40px sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText(`Wave ${this.wave}`, pos.x, pos.y);
   }
   render(ctx, camera, path) {
      for (const spot of this.spots) {
         spot.render(ctx, camera);
      }
      for (const enemy of this.enemy) {
         enemy.render(ctx, camera);
      }
      this.drawPathEnds(ctx, camera, path);
      this.drawWaveText(ctx, camera);
   }
};
