'use strict';
const { GAME } = require('./constants');

module.exports = function resizeCanvas(canvas, func = () => {}) {
   if (!canvas) return;
   if (canvas.width !== GAME.width) canvas.width = GAME.width;
   if (canvas.height !== GAME.height) canvas.height = GAME.height;
   canvas.style.transform = `scale(${Math.min(window.innerWidth / GAME.width, window.innerHeight / GAME.height)})`;
   canvas.style.left = `${(window.innerWidth - GAME.width) / 2}px`;
   canvas.style.top = `${(window.innerHeight - GAME.height) / 2}px`;
   func();
   return Math.min(window.innerWidth / GAME.width, window.innerHeight / GAME.height);
};
