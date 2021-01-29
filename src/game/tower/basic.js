'use strict';

const { BASIC_TOWER, GAME, BASIC_BULLET } = require('../../util/constants');
const offset = require('../../util/offset');
const Bullet = require('../bullet/basic');
const { loadSound } = require('../../util/loadAsset');
const playAudio = require('../../util/playAudio');

function degToRad(deg) {
   return (deg * Math.PI) / 180;
}
function radToDeg(rad) {
   return (rad * 180) / Math.PI;
}
module.exports = class Tower {
   constructor(x, y, object = BASIC_TOWER, bullet = BASIC_BULLET) {
      this.x = x;
      this.y = y;
      this.angle = Math.round(Math.random() * 360);
      this.stats = { ...object };
      this.rotateSpeed = this.stats.rotate_speed;
      this.radius = this.stats.size / 2;
      this.color = this.stats.color;
      this.fov = this.stats.fov;
      this.reload = Math.round(this.stats.reload_time * GAME.simulation_rate);
      this.type = this.stats.name;
      this.tick = Math.round(Math.random() * this.reload);
      this.bullet = {
         object: Bullet,
         stats: bullet,
      };
      this.renderAngle = this.angle;
      this.audio = Array(5)
         .fill(null)
         .map((_, index) => loadSound(`shoot${index + 1}.wav`));
   }
   update() {
      this.angle += this.rotateSpeed;
      this.angle = this.angle % 360;
   }
   simulate(state) {
      let target = null;
      for (let i = 0; i < state.enemy.length; i++) {
         const enemy = state.enemy[i];
         if (enemy.dead) continue;
         const distX = enemy.x - this.x;
         const distY = enemy.y - this.y;
         const dist = Math.sqrt(distX * distX + distY * distY);
         if (dist < this.fov / 2 + enemy.radius) {
            if (target === null || enemy.traveled > target.traveled) {
               target = { index: i, traveled: enemy.traveled };
            }
         }
      }
      if (target != null) {
         this.angle = radToDeg(Math.atan2(state.enemy[target.index].y - this.y, state.enemy[target.index].x - this.x));
         this.angle = this.angle % 360;
         if (this.tick % this.reload === 0) {
            if ((this.stats.reload_time < 0.15 && Math.random() < 0.3) || this.stats.reload_time > 0.15) {
               const audio = this.audio[Math.floor(Math.random() * this.audio.length)];
               audio.volume = 0.2;
               playAudio(audio);
            }
            state.bullet.push(
               new this.bullet.object(
                  this.x,
                  this.y,
                  this.bullet.stats.speed,
                  degToRad(this.angle) +
                     (this.stats.angle_randomness
                        ? (Math.random() - this.stats.angle_randomness[0]) / this.stats.angle_randomness[1]
                        : 0),
                  this.radius / 4,
                  this.fov / 2,
                  this.stats.damage,
                  this.bullet.stats
               )
            );
         }
      } else {
         this.update();
      }
      this.locked--;
      this.tick++;
      if (Math.abs(this.angle - this.renderAngle) > 100) {
         this.renderAngle = this.angle;
      } else {
         this.renderAngle += (this.angle - this.renderAngle) * (GAME.simulation_rate / 100);
      }
   }
   showStats(ctx, camera) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = this.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pos = offset(this.x, this.y, camera);
      if (pos.y > GAME.height / 2) {
         pos.y -= this.stats.stats_height;
      }
      ctx.fillRect(pos.x - this.stats.stats_width / 2, pos.y, this.stats.stats_width, this.stats.stats_height);
      ctx.fillStyle = 'white';
      ctx.fillRect(pos.x - this.stats.stats_width / 2, pos.y, this.stats.stats_width, this.stats.stats_height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'black';
      ctx.font = `${24 * camera.scale}px Arial`;
      ctx.fillText(`Type: ${this.type}`, pos.x, Math.round(pos.y + this.stats.stats_height / 5));
      ctx.fillText(
         `Damage Per Shot: ${this.stats.damage}`,
         pos.x,
         Math.round(pos.y + (this.stats.stats_height / 5) * 2)
      );
      ctx.fillText(
         `Reload Time: ${this.stats.reload_time}s`,
         pos.x,
         Math.round(pos.y + (this.stats.stats_height / 5) * 3)
      );
      ctx.fillText(
         `Field Of View: ${Math.round(this.stats.fov)}`,
         pos.x,
         Math.round(pos.y + (this.stats.stats_height / 5) * 4)
      );
   }
   render(ctx, camera) {
      const pos = offset(this.x, this.y, camera);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(degToRad(this.renderAngle));
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(0, -this.stats.barrel_height / 2, this.stats.barrel_width, this.stats.barrel_height);
      ctx.restore();
   }
};
// add towers @param {x , y}
