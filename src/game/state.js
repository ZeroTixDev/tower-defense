'use strict';

const { PATH_ENDS_COLOR, PATH_ENDS_SIZE, GAME_HEIGHT } = require('../util/constants');
const offset = require('../util/offset');
const { money } = require('./gui/all');

module.exports = class State {
   constructor() {
      this.enemy = [];
      this.spots = [];
      this.bullet = [];
      this.wave = 1;
      this.money = 100;
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
      this.money += Math.round(Math.random() * 50);
      for (let i = this.bullet.length - 1; i >= 0; i--) {
         const bullet = this.bullet[i];
         bullet.update();
         if (bullet.offScreen) {
            this.bullet.splice(i, 1);
         }
      }
      let hasTowerMenuOpen = false;
      for (const spot of this.spots) {
         spot.update(mouse, camera, this);
         if (spot.showData) {
            hasTowerMenuOpen = true;
         }
      }
      let enemyOnMouse = null;
      for (let i = this.enemy.length - 1; i >= 0; i--) {
         const enemy = this.enemy[i];
         enemy.update(this);
         enemy.showStats = false;
         if (enemy.delete) {
            this.enemy.splice(i, 1);
            continue;
         }
         if (
            !hasTowerMenuOpen &&
            enemyOnMouse === null &&
            this.intersect({ x: enemy.x, y: enemy.y }, mouse, enemy.radius, camera)
         ) {
            enemyOnMouse = i;
         }
      }
      if (enemyOnMouse != null) {
         this.enemy[enemyOnMouse].showStats = true;
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
      ctx.fillStyle = '#9e9170';
      ctx.fillText(`Wave ${this.wave}`, pos.x, pos.y);
   }
   drawGUI(ctx, camera) {
      money(ctx, camera, this.money);
   }
   render(ctx, camera, path) {
      for (const bullet of this.bullet) {
         bullet.render(ctx, camera);
      }
      let showSpotIndex = null;
      for (let i = 0; i < this.spots.length; i++) {
         const spot = this.spots[i];
         spot.render(ctx, camera);
         if (spot.showData) {
            showSpotIndex = i;
         }
      }
      let showEnemyStatsIndex = null;
      for (let i = 0; i < this.enemy.length; i++) {
         const enemy = this.enemy[i];
         enemy.render(ctx, camera);
         if (enemy.showStats) {
            showEnemyStatsIndex = i;
         }
      }
      if (showEnemyStatsIndex != null) {
         this.enemy[showEnemyStatsIndex].showEnemyStats(ctx, camera);
      }
      if (showSpotIndex != null) {
         this.spots[showSpotIndex].drawData(ctx, camera);
      }
      // this.drawPathEnds(ctx, camera, path);
      // this.drawWaveText(ctx, camera);
      this.drawGUI(ctx, camera);
   }
};
