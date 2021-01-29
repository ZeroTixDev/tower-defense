'use strict';

const { GAME, PATH } = require('../util/constants');
const offset = require('../util/offset');
const { topBar } = require('./gui/all');
const { loadSound } = require('../util/loadAsset');
const setCursor = require('../util/setCursor');
const spawnEnemy = require('../util/spawnEnemy');

module.exports = class State {
   constructor(map) {
      this.enemy = [];
      this.spots = [];
      this.bullet = [];
      this.wave = 1;
      this.money = 500;
      this.map = map;
      this.currentWave = 0;
      this.explosion = Array(4)
         .fill(null)
         .map((_, index) => loadSound(`explosion${index + 1}.wav`));
   }
   intersect(pos, mouse, radius, camera) {
      const offsetPos = offset(pos.x, pos.y, camera);
      const distX = mouse.x - offsetPos.x;
      const distY = mouse.y - offsetPos.y;
      if (Math.abs(distX) > 50 || Math.abs(distY) > 50) {
         return false;
      }
      const distance = Math.sqrt(distX * distX + distY * distY);
      return distance < radius;
   }
   spawnWave(game) {
      const wave = this.map.waves[this.currentWave];
      spawnEnemy(this.map.path, wave.enemy, game);
      this.currentWave++;
      if (this.currentWave > this.map.stats.waves - 1) {
         this.currentWave = this.map.stats.waves - 1;
         this.finishedMap = true;
      }
   }
   simulate(mouse, camera) {
      for (let i = this.bullet.length - 1; i >= 0; i--) {
         const bullet = this.bullet[i];
         bullet.update();
         if (bullet.delete) {
            this.bullet.splice(i, 1);
         }
      }
      let hasTowerMenuOpen = false;
      let hoverTowerIndex = null;
      let hoveringTower = false;
      for (let i = this.spots.length - 1; i >= 0; i--) {
         const spot = this.spots[i];
         spot.update(mouse, camera, this);
         if (spot.hovering) {
            hoveringTower = true;
         }
         spot.showStats = false;
         if (spot.showData) {
            hasTowerMenuOpen = true;
         }
         if (
            hoverTowerIndex === null &&
            spot.hasTower &&
            this.intersect({ x: spot.x, y: spot.y }, mouse, spot.radius, camera)
         ) {
            hoverTowerIndex = i;
         }
      }
      if (!hoveringTower) {
         setCursor('default');
      }
      let enemyOnMouse = null;
      for (let i = this.enemy.length - 1; i >= 0; i--) {
         const enemy = this.enemy[i];
         enemy.update(this);
         enemy.showStats = false;
         if (enemy.dying && !enemy.doingAnimation) {
            enemy.doingAnimation = true;
            this.money += Math.round(enemy.stats.money + enemy.stats.money_randomness * Math.random());
            // do sound effect
            const audio = this.explosion[Math.floor(Math.random() * this.explosion.length)];
            audio.volume = 0.15;
            audio.play();
         }
         if (enemy.dead) {
            this.enemy.splice(i, 1);
            continue;
         }
         if (
            !hasTowerMenuOpen &&
            hoverTowerIndex === null &&
            enemyOnMouse === null &&
            this.intersect({ x: enemy.x, y: enemy.y }, mouse, enemy.radius * 3, camera)
         ) {
            enemyOnMouse = i;
         }
      }
      if (enemyOnMouse != null && this.enemy[enemyOnMouse]) {
         this.enemy[enemyOnMouse].showStats = true;
      }
      if (hoverTowerIndex != null && this.spots[hoverTowerIndex]) {
         this.spots[hoverTowerIndex].showStats = true;
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
         if (spot.selectedIndex != null) {
            spot.addTower(this);
         }
      }
      if (spotOnMouse != null) {
         const spot = this.spots[spotOnMouse];
         if (spot.y < GAME.height / 2 + GAME.height / 10) {
            spot.showData = 'down';
         } else {
            spot.showData = 'up';
         }
      }
   }
   drawPathEnds(ctx, camera, path) {
      ctx.fillStyle = PATH.ends_color;
      ctx.beginPath();
      const start = offset(path[0].x, path[0].y, camera);
      ctx.arc(start.x, start.y, (PATH.ends_size / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      const end = offset(path[path.length - 1].x, path[path.length - 1].y, camera);
      ctx.arc(end.x, end.y, (PATH.ends_size / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
   drawWaveText(ctx, camera) {
      const pos = offset(this.waveLocation.x, this.waveLocation.y, camera);
      ctx.font = '40px sans-serif';
      ctx.fillStyle = '#9e9170';
      ctx.fillText(`Wave ${this.wave}`, pos.x, pos.y);
   }
   drawGUI(ctx, camera) {
      topBar(ctx, camera, { money: this.money, wave: this.currentWave });
   }
   render(ctx, camera, GUI) {
      for (const bullet of this.bullet) {
         bullet.render(ctx, camera);
      }
      let showSpotIndex = null;
      let hoverSpotIndex = null;
      for (let i = 0; i < this.spots.length; i++) {
         const spot = this.spots[i];
         spot.render(ctx, camera);
         if (spot.showData) {
            showSpotIndex = i;
         }
         if (spot.showStats && spot.hasTower) {
            hoverSpotIndex = i;
         }
      }
      let showEnemyStatsIndex = null;
      for (let i = 0; i < this.enemy.length; i++) {
         const enemy = this.enemy[i];
         enemy.render(ctx, camera);
         if (enemy.showStats && hoverSpotIndex === null) {
            showEnemyStatsIndex = i;
         }
      }
      if (showEnemyStatsIndex != null) {
         this.enemy[showEnemyStatsIndex].showEnemyStats(ctx, camera);
      }
      if (showSpotIndex != null) {
         this.spots[showSpotIndex].drawData(ctx, camera);
      }
      if (hoverSpotIndex != null) {
         this.spots[hoverSpotIndex].showTowerStats(ctx, camera);
      }
      // this.drawPathEnds(ctx, camera, path);
      // this.drawWaveText(ctx, camera);
      this.drawGUI(GUI, camera);
   }
};
