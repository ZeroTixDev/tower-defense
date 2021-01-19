'use strict';

require('./style.css');
const Game = require('./game');
const dom = require('./references');

dom.playButton.addEventListener('mousedown', () => {
   dom.menu.classList.add('hidden');
   const game = new Game();
   game.start();
});
