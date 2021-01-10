'use strict';

const { SPOT_COLOR, SPOT_SIZE } = require('../util/constants');
const offset = require('../util/offset');
module.exports = class Spot {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = SPOT_SIZE / 2;
      this.color = SPOT_COLOR;
   }
   get fill() {
      return `rgb(${this.color}, ${this.color}, ${this.color})`;
   }
   update(mouse, camera) {
      const offsetPos = offset(this.x, this.y, camera);
      const distX = mouse.x - offsetPos.x;
      const distY = mouse.y - offsetPos.y;
      this.color = SPOT_COLOR;
      if (Math.abs(distX) < 50 && Math.abs(distY) < 50) {
         const distance = Math.sqrt(distX * distX + distY * distY);
         if (distance < this.radius) {
            this.color = 255;
         }
      }
   }
   drawSpot(ctx, camera) {
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      const pos = offset(this.x, this.y, camera);
      ctx.arc(pos.x, pos.y, this.radius * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
   drawData(ctx, camera) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      const pos = offset(this.x, this.y, camera);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '40px Arial';
      if (this.showData === 'down') {
         ctx.fillRect(pos.x - 100, pos.y, 200, 100);
         ctx.fillStyle = 'black';
         ctx.fillText(`TOWERS`, pos.x, pos.y + 50);
      } else if (this.showData === 'up') {
         ctx.fillRect(pos.x - 100, pos.y, 200, -100);
         ctx.fillStyle = 'black';
         ctx.fillText(`TOWERS`, pos.x, pos.y - 50);
      }
   }
   render(ctx, camera) {
      this.drawSpot(ctx, camera);
      if (this.showData) {
         this.drawData(ctx, camera);
      }
   }
};
