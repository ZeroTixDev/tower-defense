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
};

const BASIC_TOWER = Object.assign(
   { ...TOWER },
   {
      fov: 600,
      damage: 15,
      reload_time: 0.5,
      color: '#474747',
      name: 'Basic',
   }
);

const POUNDER_TOWER = Object.assign(
   { ...TOWER },
   {
      fov: 500,
      damage: 80,
      reload_time: 2,
      color: '#0a591a',
      name: 'Pounder',
      size: 45,
      barrel_height: 35,
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
   MONEY,
   BASIC_BULLET,
   POUNDER_BULLET,
   TOWER,
};
