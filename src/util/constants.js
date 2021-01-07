'use strict';

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
const BACKGROUND_COLOR = 'black';
const LINE_DISTANCE = 50;
const PATH_SIZE = 70;
const PATH_INSIDE_COLOR = 'white';
const SIMULATION_RATE = 30;
const FAST_ENEMY_COLOR = '#19d4ab';
const BASIC_ENEMY_COLOR = '#2d2e2e';
const PATH_ENDS_COLOR = '#470703';
const PATH_ENDS_SIZE = 70;
const SPOT_COLOR = '#212121';
const CONTROLS = {
   i: 'zoomin',
   o: 'zoomout',
   m: 'switchmode',
   k: 'static',
   w: 'up',
   s: 'down',
   a: 'left',
   d: 'right',
};

module.exports = {
   GAME_WIDTH,
   GAME_HEIGHT,
   BACKGROUND_COLOR,
   LINE_DISTANCE,
   PATH_SIZE,
   SIMULATION_RATE,
   FAST_ENEMY_COLOR,
   BASIC_ENEMY_COLOR,
   PATH_INSIDE_COLOR,
   PATH_ENDS_COLOR,
   PATH_ENDS_SIZE,
   SPOT_COLOR,
   CONTROLS,
};
