'use strict';

const { BASIC_TOWER, GAME, BASIC_BULLET } = require('../../util/constants');
const offset = require('../../util/offset');
const Bullet = require('../bullet/basic');

function degToRad(deg) {
   return (deg * Math.PI) / 180;
}
function radToDeg(rad) {
   return (rad * 180) / Math.PI;
}
module.exports = class Tower {
   constructor(x, y, reload = BASIC_TOWER.reload_time) {
      this.x = x;
      this.y = y;
      this.angle = Math.round(Math.random() * 360);
      this.rotateSpeed = BASIC_TOWER.rotate_speed;
      this.radius = BASIC_TOWER.size / 2;
      this.color = BASIC_TOWER.color;
      this.fov = BASIC_TOWER.fov;
      this.reload = Math.round(reload * GAME.simulation_rate);
      this.type = BASIC_TOWER.name;
      this.tick = 0;
   }
   update() {
      this.angle += this.rotateSpeed;
      this.angle = this.angle % 360;
   }
   simulate(state) {
      let distance = null;
      for (let i = 0; i < state.enemy.length; i++) {
         const enemy = state.enemy[i];
         const distX = enemy.x - this.x;
         const distY = enemy.y - this.y;
         if (enemy.dead) continue;
         const dist = Math.sqrt(distX * distX + distY * distY);
         if (dist < this.fov / 2 + enemy.radius) {
            if (distance === null || distance.dist > dist) {
               distance = { dist, index: i };
            }
         }
      }
      if (distance != null) {
         this.angle = radToDeg(
            Math.atan2(state.enemy[distance.index].y - this.y, state.enemy[distance.index].x - this.x)
         );
         this.angle = this.angle % 360;
         if (this.tick % this.reload === 0) {
            state.bullet.push(
               new Bullet(this.x, this.y, BASIC_BULLET.speed, degToRad(this.angle), this.radius / 4, this.fov / 2)
            );
         }
      } else {
         this.update();
      }
      this.locked--;
      this.tick++;
   }
   showStats(ctx, camera) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = this.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pos = offset(this.x, this.y, camera);
      ctx.fillRect(pos.x - BASIC_TOWER.stats_width / 2, pos.y, BASIC_TOWER.stats_width, BASIC_TOWER.stats_height);
      ctx.fillStyle = 'white';
      ctx.fillRect(pos.x - BASIC_TOWER.stats_width / 2, pos.y, BASIC_TOWER.stats_width, BASIC_TOWER.stats_height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'black';
      ctx.font = `${28 * camera.scale}px Arial`;
      ctx.fillText(`type: ${this.type}`, pos.x, Math.round(pos.y + BASIC_TOWER.stats_height / 3));
      ctx.fillText(
         `DPS: ${Math.round(BASIC_TOWER.damage / BASIC_TOWER.reload_time)}`,
         pos.x,
         Math.round(pos.y + BASIC_TOWER.stats_height - BASIC_TOWER.stats_height / 3)
      );
   }
   render(ctx, camera) {
      const pos = offset(this.x, this.y, camera);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(degToRad(this.angle));
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(0, -BASIC_TOWER.barrel_height / 2, BASIC_TOWER.barrel_width, BASIC_TOWER.barrel_height);
      ctx.restore();
   }
};
// add towers @param {x , y}
