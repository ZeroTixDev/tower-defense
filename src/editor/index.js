'use strict';

require('./style.css');

const { GAME } = require('../util/constants');
// const loadImage = require('../util/loadImage');
const drawCursor = require('..//util/drawCursor');
const resizeCanvas = require('../util/resizeCanvas');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const mouse = {
   x: 0,
   y: 0,
};
listen('resize', () => resizeCanvas(canvas));
listen(
   'mousemove',
   (e) => {
      if (!scale || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = Math.round((e.pageX - rect.left) / scale);
      mouse.y = Math.round((e.pageY - rect.top) / scale);
   },
   canvas
);
let scale = Math.min(window.innerWidth / GAME.width, window.innerHeight / GAME.height);
resizeCanvas(canvas, () => {
   scale = Math.min(window.innerWidth / GAME.width, window.innerHeight / GAME.height);
});
document.body.appendChild(canvas);
function render() {
   ctx.fillStyle = GAME.background_color;
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   drawCursor({ mouse, ctx });
}

function update() {}

function listen(type, func, element = window) {
   element.addEventListener(type, func);
}

(function run() {
   update();
   render();
   requestAnimationFrame(run);
})();

console.log('tower defense editor (by ZeroTix)');
