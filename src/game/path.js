'use strict';

const offset = require('../util/offset');

module.exports = class Path {
   constructor(paths, size) {
      this.paths = paths;
      this.pathSize = size;
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
      ctx.lineWidth = this.pathSize;
      ctx.stroke();
      // inside
      ctx.beginPath();
      this.lineToPaths(ctx, camera);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = this.pathSize * 0.8;
      ctx.stroke();
      // ideal path
      ctx.beginPath();
      this.lineToPaths(ctx, camera);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();
   }
};
