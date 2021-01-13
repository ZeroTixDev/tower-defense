'use strict';

const {
   BASIC_ENEMY_COLOR,
   BASIC_ENEMY_SPEED,
   BASIC_ENEMY_SIZE,
   BASIC_ENEMY_HEALTH,
   ENEMY_STATS_WIDTH,
   ENEMY_STATS_HEIGHT,
   SIMULATION_RATE,
} = require('../../util/constants');
const offset = require('../../util/offset');

module.exports = class Enemy {
   constructor(path, speed = BASIC_ENEMY_SPEED, size = BASIC_ENEMY_SIZE, health = BASIC_ENEMY_HEALTH) {
      this.pathIndex = 1;
      this.path = path;
      this.x = this.lastPath.x;
      this.y = this.lastPath.y;
      this.radius = size / 2;
      this.speed = speed;
      this.color = BASIC_ENEMY_COLOR;
      this.accuracy = 5;
      this.calculateVelocity();
      this.health = health;
      this.maxHealth = health;
      this.showStats = false;
      this.deadTimer = 0;
      this.type = 'Basic';
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
         if (this.deadTimer > SIMULATION_RATE) {
            this.delete = true;
         }
         return;
      }
      for (let i = 0; i < this.accuracy; i++) {
         this.x += this.xv;
         this.y += this.yv;
         if (this.onPath) {
            this.pathIndex++;
            this.x = this.lastPath.x;
            this.y = this.lastPath.y;
            if (!this.currentPath) {
               this.pathIndex = 1;
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
            state.bullet.splice(i, 1);
         }
      }
   }
   get roundPos() {
      return { x: Math.round(this.x), y: Math.round(this.y) };
   }
   drawEnemy(ctx, fill, camera) {
      ctx.fillStyle = fill;
      if (this.dead) {
         ctx.globalAlpha = 1 - this.deadTimer / SIMULATION_RATE;
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
      ctx.fillRect(pos.x - width / 2, pos.y - this.radius - 5, Math.round(width * (this.health / this.maxHealth)), 10);
      ctx.strokeRect(pos.x - width / 2, pos.y - this.radius - 5, width, 10);
   }
   showEnemyStats(ctx, camera) {
      if (this.dead) return;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = this.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pos = offset(this.x, this.y, camera);
      ctx.fillRect(pos.x - ENEMY_STATS_WIDTH / 2, pos.y, ENEMY_STATS_WIDTH, ENEMY_STATS_HEIGHT);
      ctx.fillStyle = 'white';
      ctx.fillRect(pos.x - ENEMY_STATS_WIDTH / 2, pos.y, ENEMY_STATS_WIDTH, ENEMY_STATS_HEIGHT);
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'black';
      ctx.font = `${28 * camera.scale}px Arial`;
      ctx.fillText(`type: ${this.type}`, pos.x, Math.round(pos.y + ENEMY_STATS_HEIGHT / 3));
      ctx.fillText(
         `speed: ${Math.round(this.speed * 4)}`,
         pos.x,
         Math.round(pos.y + ENEMY_STATS_HEIGHT - ENEMY_STATS_HEIGHT / 3)
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
