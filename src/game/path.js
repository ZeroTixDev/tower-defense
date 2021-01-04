'use strict';

const offset = require('../util/offset');
const { PATH_SIZE } = require('../util/constants');

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
      ctx.strokeStyle = 'black';
      ctx.lineWidth = PATH_SIZE;
      ctx.stroke();
      // inside
      ctx.beginPath();
      this.lineToPaths(ctx, camera);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = PATH_SIZE * 0.8;
      ctx.stroke();
   }
};
