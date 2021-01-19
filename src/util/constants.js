'use strict';

const GAME = {
   width: 1600,
   height: 900,
   margin: 200,
   simulation_rate: 60,
   background_color: '#dbd2ba',
};

const CONTROLS = {
   i: 'zoomin',
   o: 'zoomout',
};

const PATH = {
   size: 75,
   inside_color: '#bda562',
   stroke_color: '#8f7328',
   ends_color: '#d40018',
   ends_size: 70,
};

const SPOT = {
   color: '140', // this is a number because the spot class handles it like rgb(33, 33, 33) lol just to stop confusion
   size: 65,
};

const ENEMY = {
   stats_width: 150,
   stats_height: 100,
   speed: 2,
   health: 100,
   color: 'black',
   size: 50,
   name: 'Default',
};

const BASIC_ENEMY = Object.assign(
   { ...ENEMY },
   {
      color: '#2d2e2e',
      speed: 2.5,
      size: 50,
      health: 100,
      name: 'Basic',
   }
);

const FAST_ENEMY = Object.assign(
   { ...ENEMY },
   {
      color: '#19d4ab',
      speed: 3.5,
      size: 45,
      health: 70,
      name: 'Fast',
   }
);

const STRONG_ENEMY = Object.assign(
   { ...ENEMY },
   {
      color: '#73020f',
      speed: 2,
      size: 55,
      health: 200,
      name: 'Strong',
   }
);

const TOWER = {
   rotate_speed: 2.5,
   display_width: 290,
   display_height: 90,
   stats_width: 150,
   stats_height: 100,
   barrel_width: 35,
   barrel_height: 20,
   size: 45,
   tiers: [
      { name: 'bronze', tiers: 4, color: '33' },
      { name: 'gold', tiers: 4 },
      { name: 'diamond', tiers: 4 },
      { name: 'ruby', tiers: 4 },
   ],
   fov: 400,
   damage: 15,
   color: 'black',
   name: 'Default',
};

const BASIC_TOWER = Object.assign(
   { ...TOWER },
   {
      fov: 400,
      damage: 15,
      reload_time: 0.5,
      color: '#474747',
      name: 'Basic',
   }
);

const MONEY = {
   display_width: 200,
   display_height: 75,
};

const BULLET = {
   speed: 8,
   size: 20,
   color: 'black',
};
const BASIC_BULLET = Object.assign(
   { ...BULLET },
   {
      speed: 8,
      size: 20,
      color: '#323232',
   }
);
// const GAME_WIDTH = 1600;
// const GAME_HEIGHT = 900;
// const BACKGROUND_COLOR = '#dbd2ba';
const LINE_DISTANCE = 50; // idk we'll see
// const PATH_SIZE = 75;
// const PATH_INSIDE_COLOR = '#bda562';
// const PATH_STROKE_COLOR = '#8f7328';
// const SIMULATION_RATE = 60;
// const FAST_ENEMY_COLOR = '#19d4ab';
// const BASIC_ENEMY_COLOR = '#2d2e2e';
// const STRONG_ENEMY_COLOR = '#73020f';
// const PATH_ENDS_COLOR = '#d40018';
// const PATH_ENDS_SIZE = 70;
// const SPOT_COLOR = '140'; // this is a number because the spot class handles it like rgb(33, 33, 33) lol just to stop confusion
// const SPOT_SIZE = 65;
// const TOWER_ROTATE_SPEED = 2.5;
// const TOWER_DISPLAY_WIDTH = 300;
// const TOWER_DISPLAY_HEIGHT = 100;
// const TOWER_BARREL_WIDTH = 35;
// const TOWER_BARREL_HEIGHT = 20;
// const ENEMY_STATS_WIDTH = 150;
// const ENEMY_STATS_HEIGHT = 100;
// const TOWER_SIZE = 45;
// const BASIC_TOWER_FOV = 400;
// const BASIC_ENEMY_SPEED = 2.5;
// const BASIC_ENEMY_SIZE = 50;
// const BASIC_BULLET_SPEED = 8;
// const BASIC_ENEMY_HEALTH = 100;
// const FAST_ENEMY_SPEED = 3.5;
// const FAST_ENEMY_SIZE = 45;
// const FAST_ENEMY_HEALTH = 70;
// const BASIC_TOWER_DAMAGE = 15;
// const STRONG_ENEMY_SPEED = 2;
// const STRONG_ENEMY_SIZE = 55;
// const GAME_MARGIN = 200;
// const STRONG_ENEMY_HEALTH = 200;
// const BASIC_TOWER_RELOAD_TIME = 0.5;
// const BASIC_BULLET_SIZE = 20;
// const BASIC_TOWER_COLOR = '#474747';
// const BASIC_BULLET_COLOR = '#323232';
// const TOWER_TIERS = 4;
// const TOWER_LEVELS = [
// { name: 'bronze', tiers: 4, color: '33' },
// { name: 'gold', tiers: 4 },
// { name: 'diamond', tiers: 4 },
// { name: 'ruby', tiers: 4 },
// ];
// const MONEY_DISPLAY_WIDTH = 200;
// const MONEY_DISPLAY_HEIGHT = 75;

module.exports = {
   GAME,
   CONTROLS,
   PATH,
   SPOT,
   BASIC_ENEMY,
   FAST_ENEMY,
   STRONG_ENEMY,
   BASIC_TOWER,
   MONEY,
   BASIC_BULLET,
   TOWER,
};
