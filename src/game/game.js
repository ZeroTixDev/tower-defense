'use strict';

const resizeCanvas = require('../util/resizeCanvas');
const Path = require('./path');
const Camera = require('./camera');
const State = require('./state');
const Spot = require('./spot');
const { GAME, CONTROLS } = require('../util/constants');
const currentTick = require('../util/currentTick');
const spawnEnemy = require('../util/spawnEnemy');

module.exports = class Game {
   constructor() {
      this.wave = 0;
      this.towers = [];
      this.events = Object.create(null);
      this.camera = new Camera();
      this.map = require('../../maps/map.json');
      this.path = this.map.path;
      this.pathObject = new Path(this.path);
      this.canvas = document.createElement('canvas');
      this.GUI = {
         canvas: document.createElement('canvas'),
         last: {
            money: null,
         },
      };
      this.GUI.ctx = this.GUI.canvas.getContext('2d');
      this.ctx = this.canvas.getContext('2d');
      this.state = new State();
      this.makeSpots();
      this.state.waveLocation = this.map.waveLocation;
      this.tick = 0;
      this.time = window.performance.now();
      this.startTime = window.performance.now();
      this.mouse = {
         x: 0,
         y: 0,
         down: false,
      };
      this.resize();
      this.listen('resize', () => {
         this.resize();
      });
      this.listen('mousemove', (event) => {
         const bound = this.canvas.getBoundingClientRect();
         this.mouse.x = Math.round((event.pageX - bound.left) / this.scale);
         this.mouse.y = Math.round((event.pageY - bound.top) / this.scale);
      });
      this.controls = CONTROLS;
      this.listen('keydown', this.trackKeys.bind(this));
      this.listen('keyup', this.trackKeys.bind(this));
      this.listen('mousedown', () => {
         this.mouse.down = true;
         this.state.handleMouseDown(this.mouse, this.camera);
      });
      this.listen('mouseup', () => {
         this.mouse.down = false;
      });
      document.body.appendChild(this.canvas);
      document.body.appendChild(this.GUI.canvas);
   }
   resize() {
      this.scale = resizeCanvas(this.canvas);
      resizeCanvas(this.GUI.canvas);
   }
   trackKeys(event) {
      if (event.repeat) return;
      if (this.controls[event.key.toLowerCase()]) {
         /*switch (this.controls[event.key.toLowerCase()]) {
            case 'zoomin':
               if (event.type === 'keyup') {
                  this.camera.zoomIn();
                  console.log(this.camera.scale);
               }
               break;
            case 'zoomout':
               if (event.type === 'keyup') {
                  this.camera.zoomOut();
                  console.log(this.camera.scale);
               }
               break;
         }*/
      }
   }
   makeSpots() {
      for (const spot of this.map.spots) {
         this.state.spots.push(new Spot(spot.x, spot.y));
      }
   }
   newEvent(func, tick) {
      if (this.events[Math.round(tick)] === undefined) {
         this.events[Math.round(tick)] = [];
      }
      this.events[Math.round(tick)].push(func);
   }
   listen(type, func, element = window) {
      element.addEventListener(type, func.bind(this));
   }
   stop() {
      if (this.afr) {
         window.cancelAnimationFrame(this.afr);
      }
   }
   start() {
      spawnEnemy(this.path, this.map.enemy, this);
      this.lastTime = 0;
      (function run(time = 0) {
         this.delta = (time - this.lastTime) / 1000;
         this.lastTime = time;
         this.update();
         this.render();
         this.afr = requestAnimationFrame(run.bind(this));
      }.bind(this)());
   }
   render() {
      this.ctx.fillStyle = GAME.background_color;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.pathObject.render(this.ctx, this.camera);
      this.state.render(this.ctx, this.camera, this.GUI);
   }
   simulate() {
      this.state.simulate(this.mouse, this.camera);
   }
   update() {
      let expectedTick = currentTick(this.startTime);
      if (expectedTick - this.tick > GAME.simulation_rate / 3) {
         this.startTime += window.performance.now() - this.time;
         expectedTick = this.tick;
         this.tick -= 1;
      }
      this.camera.interp(this.mouse.x, this.mouse.y, this.delta);
      this.time = window.performance.now();
      while (this.tick < expectedTick) {
         if (this.events[this.tick]) {
            for (const func of this.events[this.tick]) {
               func();
            }
            delete this.events[this.tick];
         }
         this.simulate();
         this.tick++;
      }
   }
};
