'use strict';

const GAME = {
   width: 1600,
   height: 900,
   margin: 200,
   simulation_rate: 60,
   background_color: '#291627',
};

const CONTROLS = {
   ' ': { type: 'pause', keylock: true },
};

const THEME_SONG = {
   rate: 1.6,
   paused_rate: 0.9,
   loop: true,
   volume: 0.65,
};

const PATH = {
   size: 75,
   inside_color: '#94658a',
   stroke_color: '#701f5f',
   ends_color: '#d40018',
   ends_size: 70,
};

const SPOT = {
   color: 120, // 0 - 255  this is a number because the spot class handles it like rgb(33, 33, 33) lol just to stop confusion
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
   money: 25,
   money_randomness: 50,
};

const BASIC_ENEMY = Object.assign(
   { ...ENEMY },
   {
      color: '#2d2e2e',
      speed: 2.5,
      size: 50,
      health: 150,
      name: 'Basic',
      money: 35,
      money_randomness: 80,
   }
);

const FAST_ENEMY = Object.assign(
   { ...ENEMY },
   {
      color: '#19d4ab',
      speed: 3.5,
      size: 45,
      health: 100,
      name: 'Fast',
      money: 30,
      money_randomness: 40,
   }
);

const STRONG_ENEMY = Object.assign(
   { ...ENEMY },
   {
      color: '#73020f',
      speed: 2,
      size: 55,
      health: 300,
      name: 'Strong',
      money: 80,
      money_randomness: 80,
   }
);

const TOWER = {
   rotate_speed: 2.5,
   display_width: 290,
   display_height: 90,
   stats_width: 200,
   stats_height: 150,
   barrel_width: 35,
   barrel_height: 20,
   size: 45,
   tiers: [
      { name: 'bronze', tiers: 4 },
      { name: 'gold', tiers: 4 },
      { name: 'diamond', tiers: 4 },
      { name: 'ruby', tiers: 4 },
   ],
   fov: 400,
   damage: 15,
   color: 'black',
   name: 'Default',
   cost: 50,
};

const BASIC_TOWER = Object.assign(
   { ...TOWER },
   {
      fov: 600,
      damage: 20,
      reload_time: 0.4,
      color: '#474747',
      name: 'Basic',
      cost: 200,
   }
);

const POUNDER_TOWER = Object.assign(
   { ...TOWER },
   {
      fov: 650,
      damage: 165,
      reload_time: 1.1,
      color: '#0a591a',
      name: 'Pounder',
      size: 45,
      barrel_height: 35,
      cost: 500,
   }
);

const GUNNER_TOWER = Object.assign(
   { ...TOWER },
   {
      fov: 675,
      damage: 10,
      reload_time: 0.07,
      color: '#a1081a',
      name: 'Gunner',
      size: 50,
      barrel_height: 40,
      cost: 800,
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
   name: 'Default',
   size_randomness: 0,
   angle_randomness: null, // (Math.random() - 0.5) / 2
};
const BASIC_BULLET = Object.assign(
   { ...BULLET },
   {
      speed: 10,
      size: 20,
      color: '#323232',
      name: 'Basic',
   }
);

const POUNDER_BULLET = Object.assign(
   { ...BULLET },
   {
      speed: 7,
      size: 50,
      color: '#0b4d18',
      name: 'Pounder',
   }
);

const GUNNER_BULLET = Object.assign(
   { ...BULLET },
   {
      speed: 7,
      size: 15,
      color: '#9e2433',
      name: 'Gunner',
      size_randomness: 15,
      angle_randomness: [0.5, 1],
   }
);

module.exports = {
   GAME,
   CONTROLS,
   PATH,
   SPOT,
   BASIC_ENEMY,
   FAST_ENEMY,
   STRONG_ENEMY,
   BASIC_TOWER,
   POUNDER_TOWER,
   GUNNER_TOWER,
   MONEY,
   BASIC_BULLET,
   POUNDER_BULLET,
   GUNNER_BULLET,
   THEME_SONG,
   TOWER,
};
