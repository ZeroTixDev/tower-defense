'use strict';

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
const BACKGROUND_COLOR = '#dbd2ba';
const LINE_DISTANCE = 50;
const PATH_SIZE = 75;
const PATH_INSIDE_COLOR = '#bda562';
const PATH_STROKE_COLOR = '#8f7328';
const SIMULATION_RATE = 30;
const FAST_ENEMY_COLOR = '#19d4ab';
const BASIC_ENEMY_COLOR = '#2d2e2e';
const STRONG_ENEMY_COLOR = '#73020f';
const PATH_ENDS_COLOR = '#d40018';
const PATH_ENDS_SIZE = 70;
const SPOT_COLOR = '140'; // this is a number because the spot class handles it like rgb(33, 33, 33) lol just to stop confusion
const SPOT_SIZE = 65;
const CONTROLS = {
   i: 'zoomin',
   o: 'zoomout',
};
const TOWER_ROTATE_SPEED = 5;
const TOWER_DISPLAY_WIDTH = 300;
const TOWER_DISPLAY_HEIGHT = 100;
const TOWER_BARREL_WIDTH = 35;
const TOWER_BARREL_HEIGHT = 20;
const ENEMY_STATS_WIDTH = 150;
const ENEMY_STATS_HEIGHT = 100;
const TOWER_SIZE = 45;
const BASIC_TOWER_FOV = 400;
const BASIC_TOWER_COLOR = '#474747';
const TOWER_TIERS = 4;
const TOWER_LEVELS = [
   { name: 'bronze', tiers: 4, color: '33' },
   { name: 'gold', tiers: 4 },
   { name: 'diamond', tiers: 4 },
   { name: 'ruby', tiers: 4 },
];

module.exports = {
   GAME_WIDTH,
   GAME_HEIGHT,
   BACKGROUND_COLOR,
   LINE_DISTANCE,
   PATH_SIZE,
   PATH_STROKE_COLOR,
   SIMULATION_RATE,
   FAST_ENEMY_COLOR,
   BASIC_ENEMY_COLOR,
   PATH_INSIDE_COLOR,
   STRONG_ENEMY_COLOR,
   PATH_ENDS_COLOR,
   PATH_ENDS_SIZE,
   SPOT_COLOR,
   BASIC_TOWER_FOV,
   SPOT_SIZE,
   CONTROLS,
   TOWER_ROTATE_SPEED,
   TOWER_DISPLAY_WIDTH,
   TOWER_DISPLAY_HEIGHT,
   ENEMY_STATS_WIDTH,
   ENEMY_STATS_HEIGHT,
   TOWER_LEVELS,
   TOWER_TIERS,
   BASIC_TOWER_COLOR,
   TOWER_SIZE,
   TOWER_BARREL_WIDTH,
   TOWER_BARREL_HEIGHT,
};
