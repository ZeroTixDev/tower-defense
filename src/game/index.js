'use strict';

require('./style.css');
const Game = require('./game');

const game = new Game();

game.start();

const shortcut_icon = document.createElement('link');
shortcut_icon.rel = 'shortcut icon';
shortcut_icon.href = 'https://zerotixdev.github.io/tower-defense/dist/game/logo.png';
document.head.appendChild(shortcut_icon);
