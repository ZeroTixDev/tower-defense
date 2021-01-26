'use strict';

const { BASIC_ENEMY, GAME } = require('../../util/constants');
const offset = require('../../util/offset');
const { loadSound } = require('../../util/loadAsset');

module.exports = class Enemy {
   constructor(path, stats = BASIC_ENEMY) {
      this.pathIndex = 1;
      this.path = path;
      this.stats = { ...stats };
      this.radius = this.stats.size / 2;
      this.color = this.stats.color;
      this.accuracy = 5;
      this.speed = this.stats.speed;
      this.health = this.stats.health;
      this.maxHealth = this.stats.health;
      this.showStats = false;
      this.deadTimer = 0;
      this.type = this.stats.name;
      this.x = this.lastPath.x;
      this.y = this.lastPath.y;
      this.calculateVelocity();
      this.id = Math.random() * 100000;
      this.renderHealth = this.health;
      this.doingAnimation = false;
      this.traveled = 0;
      this.audio = Array(3)
         .fill(null)
         .map((_, index) => loadSound(`hit${index + 1}.wav`));
   }
   get dead() {
      return this.health <= 0;
   }
   lerp(start, end, time) {
      return start * (1 - time) + end * time;
   }
   findAngle() {
      return Math.atan2(this.currentPath.y - this.lastPath.y, this.currentPath.x - this.lastPath.x);
   }
   calculateVelocity() {
      this.angle = this.findAngle();
      this.xv = (this.speed * Math.cos(this.angle)) / this.accuracy;
      this.yv = (this.speed * Math.sin(this.angle)) / this.accuracy;
   }
   update(state) {
      if (this.dead) {
         this.deadTimer++;
         if (this.deadTimer > GAME.simulation_rate / 2) {
            this.delete = true;
         }
         return;
      }
      this.traveled++;
      for (let i = 0; i < this.accuracy; i++) {
         this.x += this.xv;
         this.y += this.yv;
         if (this.onPath) {
            this.pathIndex++;
            this.x = this.lastPath.x;
            this.y = this.lastPath.y;
            if (!this.currentPath) {
               this.pathIndex = 1;
               this.traveled = 0;
               this.x = this.path[0].x;
               this.y = this.path[0].y;
               this.calculateVelocity();
               // this.dead = true; break;
            } else {
               this.calculateVelocity();
            }
         }
      }
      for (let i = state.bullet.length - 1; i >= 0; i--) {
         const bullet = state.bullet[i];
         const distX = bullet.x - this.x;
         const distY = bullet.y - this.y;
         const distance = Math.sqrt(distX * distX + distY * distY);
         if (distance < bullet.radius + this.radius) {
            this.health -= bullet.damage;
            if (Math.random() < 0.3) {
               const audio = this.audio[Math.floor(Math.random() * this.audio.length)];
               audio.volume = 0.1;
               audio.play();
            }
            state.bullet.splice(i, 1);
         }
      }
      this.renderHealth += (this.health - this.renderHealth) * (GAME.simulation_rate / 500);
   }
   get roundPos() {
      return { x: Math.round(this.x), y: Math.round(this.y) };
   }
   drawEnemy(ctx, fill, camera) {
      ctx.fillStyle = fill;
      if (this.dead) {
         ctx.globalAlpha = 1 - this.deadTimer / (GAME.simulation_rate / 2);
      }
      ctx.beginPath();
      const pos = offset(this.x, this.y, camera);
      ctx.arc(pos.x, pos.y, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 1;
      if (this.dead) return;
      const width = 50;
      ctx.fillRect(
         pos.x - width / 2,
         pos.y - this.radius - 5,
         Math.round(width * (this.renderHealth / this.maxHealth)),
         10
      );
      ctx.strokeRect(pos.x - width / 2, pos.y - this.radius - 5, width, 10);
   }
   showEnemyStats(ctx, camera) {
      if (this.dead) return;
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = this.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pos = offset(this.x, this.y, camera);
      if (pos.y > GAME.height / 2) {
         pos.y -= this.stats.stats_height;
      }
      ctx.fillRect(pos.x - this.stats.stats_width / 2, pos.y, this.stats.stats_width, this.stats.stats_height);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#2d2e2e';
      ctx.fillRect(pos.x - this.stats.stats_width / 2, pos.y, this.stats.stats_width, this.stats.stats_height);
      ctx.fillStyle = 'white';
      ctx.fillRect(pos.x - this.stats.stats_width / 2, pos.y, this.stats.stats_width, this.stats.stats_height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'black';
      ctx.font = `${22 * camera.scale}px Arial`;
      ctx.fillText(`Type: ${this.type}`, pos.x, Math.round(pos.y + this.stats.stats_height / 4));
      ctx.fillText(
         `Speed: ${Math.round(this.speed * 4)}`,
         pos.x,
         Math.round(pos.y + (this.stats.stats_height / 4) * 2)
      );
      ctx.fillText(
         `Size: ${Math.round(this.stats.size)}`,
         pos.x,
         Math.round(pos.y + (this.stats.stats_height / 4) * 3)
      );
   }
   render(ctx, camera) {
      this.drawEnemy(ctx, this.color, camera);
   }
   get lastPath() {
      return this.path[this.pathIndex - 1];
   }
   get onPath() {
      return Math.abs(this.currentPath.x - this.roundPos.x) < 2 && Math.abs(this.currentPath.y - this.roundPos.y) < 2;
   }
   get nextPath() {
      return this.path[this.pathIndex + 1];
   }
   get currentPath() {
      return this.path[this.pathIndex];
   }
};
