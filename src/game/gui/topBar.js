'use strict';

const { MONEY, GAME } = require('../../util/constants');
const round = require('../../util/round');

function formatMoney(money) {
   if (money <= 1000 - 1) {
      return `${money}`;
   } else {
      return `${round(money / 1000, 1)} K`;
   } // i can add more later
}

function addProps(object, props) {
   for (const prop in props) {
      object[prop] = props[prop];
   }
}
function sameProps(object, props) {
   for (const prop in props) {
      if (props[prop] != object[prop]) {
         return false;
      }
   }
   return true;
}
module.exports = function render(GUI, camera, current) {
   if (sameProps(GUI.last, current)) return;
   addProps(GUI.last, current);
   const ctx = GUI.ctx;
   ctx.clearRect(0, 0, GUI.canvas.width, GUI.canvas.height);
   ctx.lineWidth = 10 * camera.scale;
   const pos = {
      x: Math.round(GAME.width - MONEY.display_width + 10 * camera.scale),
      y: Math.round(-10 * camera.scale),
   };
   ctx.roundRect(pos.x, pos.y, MONEY.display_width, MONEY.display_height, 15 * camera.scale);
   ctx.fillStyle = '#80db74';
   ctx.strokeStyle = '#187d0b';
   ctx.fill();
   ctx.stroke();
   ctx.fillStyle = '#137007';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.font = '40px Trebuchet MS';
   ctx.fillText('$', Math.round(pos.x + MONEY.display_width / 4), Math.round(pos.y + MONEY.display_height / 2));
   ctx.font = '35px Arial';
   ctx.fillText(
      formatMoney(current.money),
      Math.round(pos.x + MONEY.display_width / 2 + MONEY.display_width / 20),
      Math.round(pos.y + MONEY.display_height / 2)
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
