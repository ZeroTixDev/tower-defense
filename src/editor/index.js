'use strict';

require('./style.css');

const { BACKGROUND_COLOR, GAME_WIDTH, GAME_HEIGHT } = require('../util/constants');
const loadImage = require('../util/loadImage');
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
let scale = Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT);
resizeCanvas(canvas, () => {
   scale = Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT);
});
document.body.appendChild(canvas);
function render() {
   ctx.fillStyle = BACKGROUND_COLOR;
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

console.log('tower defense editor');
