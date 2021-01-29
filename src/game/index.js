'use strict';

require('./style.css');
const Game = require('./game');
const dom = require('./references');
const fetch = require('node-fetch');
dom.playButton.addEventListener('mousedown', () => {
   dom.menu.classList.add('hidden');
   const game = new Game();
   game.start();
});

void fetch('https://version-api.zerotixdev.repl.co/')
   .then((res) => res.json())
   .then((val) => console.log(`Version: ${val?.version}`));
