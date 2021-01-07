'use strict';

const { SPOT_COLOR, SPOT_SIZE } = require('../util/constants');
const offset = require('../util/offset');
module.exports = class Spot {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = SPOT_SIZE;
      this.color = SPOT_COLOR;
   }
   get fill() {
      return `rgb(${this.color}, ${this.color}, ${this.color})`;
   }
   update(mouse, camera) {
      const offsetPos = offset(this.x, this.y, camera);
      const distX = mouse.x - offsetPos.x;
      const distY = mouse.y - offsetPos.y;
      const distance = Math.sqrt(distX * distX + distY * distY);
      if (distance < this.size / 2) {
         this.color += 0.1;
         if (this.color > 255) {
            this.color = 255;
         }
      } else {
         for (let i = 0; i < 10; i++) {
            if (this.color !== SPOT_COLOR) {
               this.color -= 1;
               if (this.color < SPOT_COLOR) {
                  this.color = SPOT_COLOR;
               }
            }
         }
      }
   }
   render(ctx, camera) {
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      const pos = offset(this.x, this.y, camera);
      ctx.arc(pos.x, pos.y, (this.size / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
};
