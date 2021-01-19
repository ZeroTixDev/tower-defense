'use strict';

const offset = require('../util/offset');
const { PATH } = require('../util/constants');

module.exports = class Path {
   constructor(paths) {
      this.paths = paths;
   }
   idx(num) {
      return this.paths[num];
   }
   lineToPaths(ctx, camera) {
      for (const { x, y } of this.paths) {
         const pos = offset(x, y, camera);
         ctx.lineTo(pos.x, pos.y);
      }
   }
   render(ctx, camera) {
      ctx.beginPath();
      ctx.lineJoin = 'round';
      // outside
      this.lineToPaths(ctx, camera);
      ctx.strokeStyle = PATH.stroke_color;
      ctx.lineWidth = PATH.size * camera.scale;
      ctx.stroke();
      // inside
      ctx.beginPath();
      this.lineToPaths(ctx, camera);
      ctx.strokeStyle = PATH.inside_color;
      ctx.lineWidth = PATH.size * 0.7 * camera.scale;
      ctx.stroke();
   }
};
