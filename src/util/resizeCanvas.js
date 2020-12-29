'use strict';
const { GAME_WIDTH, GAME_HEIGHT } = require('../constants');

module.exports = function resizeCanvas(canvas) {
   if (!canvas) return;
   if (canvas.width !== GAME_WIDTH) canvas.width = GAME_WIDTH;
   if (canvas.height !== GAME_HEIGHT) canvas.height = GAME_HEIGHT;
   canvas.style.transform = `scale(${Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT)})`;
   canvas.style.left = `${(window.innerWidth - GAME_WIDTH) / 2}px`;
   canvas.style.top = `${(window.innerHeight - GAME_HEIGHT) / 2}px`;
};
