'use strict';

const { SPOT_COLOR, SPOT_SIZE, TOWER_DISPLAY_WIDTH, TOWER_DISPLAY_HEIGHT } = require('../util/constants');
const Basic = require('./tower/basic');
const offset = require('../util/offset');
module.exports = class Spot {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = SPOT_SIZE / 2;
      this.color = SPOT_COLOR;
      this.tower = Math.random() < 0.5 ? null : new Basic(this.x, this.y);
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
      this.color = SPOT_COLOR;
      if (Math.abs(distX) < 50 && Math.abs(distY) < 50 && !this.hasTower) {
         const distance = Math.sqrt(distX * distX + distY * distY);
         if (distance < this.radius) {
            this.color = 255;
         }
      }
      if (this.hasTower) {
         this.tower.update();
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
      ctx.fillStyle = 'rgba(150, 150, 150, 0.2)';
      const pos = offset(this.x, this.y, camera);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, (this.tower.fov / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
   drawSpotData(ctx, camera) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      const pos = offset(this.x, this.y, camera);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '40px Arial';
      if (this.showData === 'down') {
         ctx.fillRect(pos.x - TOWER_DISPLAY_WIDTH / 2, pos.y, TOWER_DISPLAY_WIDTH, TOWER_DISPLAY_HEIGHT);
         ctx.fillStyle = 'black';
         ctx.fillText(`TOWERS`, pos.x, pos.y + 50);
      } else if (this.showData === 'up') {
         ctx.fillRect(pos.x - TOWER_DISPLAY_WIDTH / 2, pos.y, TOWER_DISPLAY_WIDTH, -TOWER_DISPLAY_HEIGHT);
         ctx.fillStyle = 'black';
         ctx.fillText(`TOWERS`, pos.x, pos.y - 50);
      }
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
