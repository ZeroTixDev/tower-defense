'use strict';

const { SPOT, TOWER, POUNDER_TOWER, GUNNER_TOWER, BASIC_TOWER } = require('../util/constants');
const intersects = require('../util/intersects');
const { Basic, Pounder, Gunner } = require('./tower/all');
const offset = require('../util/offset');

module.exports = class Spot {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = SPOT.size / 2;
      this.color = SPOT.color;
      this.tower = null;
      this.mouse = null;
      this.buttons = [];
      this.selectedIndex = null;
   }
   get fill() {
      return `rgb(${this.color}, ${this.color}, ${this.color})`;
   }
   get hasTower() {
      return this.tower !== null;
   }
   addTower(state) {
      if (this.selectedIndex === 0) {
         this.tower = new Basic(this.x, this.y);
         if (this.tower.stats.cost > state.money) {
            this.tower = null;
            return;
         }
         state.money -= this.tower.stats.cost;
      } else if (this.selectedIndex === 1) {
         this.tower = new Pounder(this.x, this.y);
         if (this.tower.stats.cost > state.money) {
            this.tower = null;
            return;
         }
         state.money -= this.tower.stats.cost;
      } else if (this.selectedIndex === 2) {
         this.tower = new Gunner(this.x, this.y);
         if (this.tower.stats.cost > state.money) {
            this.tower = null;
            return;
         }
         state.money -= this.tower.stats.cost;
      }
      this.selectedIndex = null;
   }
   update(mouse, camera, state) {
      const offsetPos = offset(this.x, this.y, camera);
      const distX = mouse.x - offsetPos.x;
      const distY = mouse.y - offsetPos.y;
      this.color = SPOT.color;
      this.mouse = mouse;
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
      this.selectedIndex = null;
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
      ctx.fillStyle = '#474747';
      ctx.beginPath();
      ctx.arc(
         Math.round(pos.x - TOWER.display_width / 2 + TOWER.display_width / 6),
         pos.y + TOWER.display_height / 2,
         30,
         0,
         Math.PI * 2
      );
      ctx.fill();
      ctx.fillStyle = '#0a591a';
      ctx.beginPath();
      ctx.arc(Math.round(pos.x), pos.y + TOWER.display_height / 2, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#a1081a';
      ctx.beginPath();
      ctx.arc(Math.round(pos.x + TOWER.display_width / 3), pos.y + TOWER.display_height / 2, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = `${25 * camera.scale}px Arial`;
      ctx.fillText(
         `$${BASIC_TOWER.cost}`,
         Math.round(pos.x - TOWER.display_width / 2 + TOWER.display_width / 6),
         pos.y + TOWER.display_height / 2
      );
      ctx.fillText(`$${POUNDER_TOWER.cost}`, Math.round(pos.x), pos.y + TOWER.display_height / 2);
      ctx.fillText(
         `$${GUNNER_TOWER.cost}`,
         Math.round(pos.x + TOWER.display_width / 3),
         pos.y + TOWER.display_height / 2
      );
      if (!this.mouse) return;
      if (
         intersects(
            {
               x: Math.round(pos.x - TOWER.display_width / 2),
               y: pos.y,
               w: TOWER.display_width / 3,
               h: TOWER.display_height,
            },
            this.mouse
         )
      ) {
         this.selectedIndex = 0;
      } else if (
         intersects(
            {
               x: Math.round(pos.x - TOWER.display_width / 2 + TOWER.display_width / 3),
               y: pos.y,
               w: TOWER.display_width / 3,
               h: TOWER.display_height,
            },
            this.mouse
         )
      ) {
         this.selectedIndex = 1;
      } else if (
         intersects(
            {
               x: Math.round(pos.x - TOWER.display_width / 2 + (TOWER.display_width / 3) * 2),
               y: pos.y,
               w: TOWER.display_width / 3,
               h: TOWER.display_height,
            },
            this.mouse
         )
      ) {
         this.selectedIndex = 2;
      }
      // doing some update testing but i dont want it part of render ;/
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
