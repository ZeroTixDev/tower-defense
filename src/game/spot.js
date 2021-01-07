'use strict';

const { SPOT_COLOR } = require('../util/constants');
const offset = require('../util/offset');
module.exports = class Spot {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 50;
   }
   render(ctx, camera) {
      ctx.fillStyle = SPOT_COLOR;
      ctx.beginPath();
      const pos = offset(this.x, this.y, camera);
      ctx.arc(pos.x, pos.y, (this.size / 2) * camera.scale, 0, Math.PI * 2);
      ctx.fill();
   }
};
