'use strict';

const { MONEY_DISPLAY_WIDTH, MONEY_DISPLAY_HEIGHT, GAME_WIDTH } = require('../../util/constants');
const round = require('../../util/round');

function formatMoney(money) {
   if (money <= 1000 - 1) {
      return `${money}`;
   } else {
      return `${round(money / 1000, 1)} K`;
   } // i can add more later
}
module.exports = function render(ctx, camera, money) {
   ctx.fillStyle = '#80db74';
   ctx.strokeStyle = '#187d0b';
   ctx.lineWidth = 10 * camera.scale;
   const pos = {
      x: Math.round(GAME_WIDTH - MONEY_DISPLAY_WIDTH + 10 * camera.scale),
      y: Math.round(-10 * camera.scale),
   };
   ctx.roundRect(pos.x, pos.y, MONEY_DISPLAY_WIDTH, MONEY_DISPLAY_HEIGHT, 15 * camera.scale);
   ctx.fill();
   ctx.stroke();
   ctx.fillStyle = '#137007';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.font = '40px Trebuchet MS';
   ctx.fillText('$', Math.round(pos.x + MONEY_DISPLAY_WIDTH / 4), Math.round(pos.y + MONEY_DISPLAY_HEIGHT / 2));
   ctx.font = '35px Arial';
   ctx.fillText(
      formatMoney(money),
      Math.round(pos.x + MONEY_DISPLAY_WIDTH / 2 + MONEY_DISPLAY_WIDTH / 20),
      Math.round(pos.y + MONEY_DISPLAY_HEIGHT / 2)
   );
};
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
   if (w < 2 * r) r = w / 2;
   if (h < 2 * r) r = h / 2;
   this.beginPath();
   this.moveTo(x + r, y);
   this.arcTo(x + w, y, x + w, y + h, r);
   this.arcTo(x + w, y + h, x, y + h, r);
   this.arcTo(x, y + h, x, y, r);
   this.arcTo(x, y, x + w, y, r);
   this.closePath();
   return this;
};
