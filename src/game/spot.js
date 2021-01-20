'use strict';

const { SPOT, TOWER } = require('../util/constants');
const { Basic, Pounder, Gunner } = require('./tower/all');
const offset = require('../util/offset');
module.exports = class Spot {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = SPOT.size / 2;
      this.color = SPOT.color;
      this.tower =
         Math.random() < 0.5
            ? new Gunner(this.x, this.y)
            : Math.random() > 0.5
            ? new Pounder(this.x, this.y)
            : new Basic(this.x, this.y);
   }
   get fill() {
      return `rgb(${this.color}, ${this.color}, ${this.color})`;
   }
   get hasTower() {
      return this.tower !== null;
   }
   update(mouse, camera, state) {
      const offsetPos = offset(this.x, this.y, camera);
      const distX = mouse.x - offsetPos.x;
      const distY = mouse.y - offsetPos.y;
      this.color = SPOT.color;
      if (Math.abs(distX) < 50 && Math.abs(distY) < 50 && !this.hasTower) {
         const distance = Math.sqrt(distX * distX + distY * distY);
         if (distance < this.radius) {
            this.color = SPOT.color - 25;
         }
      }
      if (this.hasTower) {
         this.tower.simulate(state);
      }
   }
   drawSpot(ctx, camera) {
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      const pos = offset(this.x, this.y, camera);
      ctx.arc(pos.x, pos.y, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fill();
   }
   drawTowerData(ctx, camera) {
      ctx.fillStyle = 'rgba(50, 50, 50, 0.3)';
      const pos = offset(this.x, this.y, camera);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, (this.tower.fov / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
   showTowerStats(ctx, camera) {
      if (!this.hasTower) return;
      this.tower.showStats(ctx, camera);
   }
   drawSpotData(ctx, camera) {
      ctx.fillStyle = '#877a56';
      ctx.globalAlpha = 0.6;
      const pos = offset(this.x, this.y, camera);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '40px Arial';
      ctx.strokeStyle = '#573700';
      ctx.lineWidth = 10;
      if (this.showData === 'up') {
         pos.y -= TOWER.display_height;
      }
      ctx.fillRect(Math.round(pos.x - TOWER.display_width / 2), pos.y, TOWER.display_width, TOWER.display_height);
      ctx.globalAlpha = 1;
      ctx.strokeRect(Math.round(pos.x - TOWER.display_width / 2), pos.y, TOWER.display_width, TOWER.display_height);
      // draw three towers rects
      ctx.strokeRect(
         Math.round(pos.x - TOWER.display_width / 2 + TOWER.display_width / 3),
         pos.y,
         TOWER.display_width / 3,
         TOWER.display_height
      );
   }
   drawData(ctx, camera) {
      if (this.hasTower) {
         this.drawTowerData(ctx, camera);
      } else {
         this.drawSpotData(ctx, camera);
      }
   }
   render(ctx, camera) {
      this.drawSpot(ctx, camera);
      if (this.hasTower) {
         this.tower.render(ctx, camera);
      }
   }
};
