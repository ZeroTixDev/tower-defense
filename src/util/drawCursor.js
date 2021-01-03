'use strict';

module.exports = function drawCursor({ mouse, ctx }) {
   ctx.fillStyle = 'black';
   ctx.beginPath();
   ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
   ctx.fill();
};
