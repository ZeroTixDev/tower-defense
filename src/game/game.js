'use strict';

const resizeCanvas = require('../util/resizeCanvas');
const Path = require('./path');
const Camera = require('./camera');
const State = require('./state');
const Spot = require('./spot');
const { BACKGROUND_COLOR, SIMULATION_RATE, CONTROLS } = require('../util/constants');
const currentTick = require('../util/currentTick');
const spawnEnemy = require('../util/spawnEnemy');

module.exports = class Game {
   constructor() {
      this.wave = 0;
      this.towers = [];
      this.events = Object.create(null);
      this.fov = 0.1;
      this.camera = new Camera();
      this.map = require('../../maps/map.json');
      this.path = this.map.path;
      this.pathObject = new Path(this.path);
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.state = new State();
      this.makeSpots();
      this.state.waveLocation = this.map.waveLocation;
      this.tick = 0;
      this.startTime = window.performance.now();
      this.mouse = {
         x: 0,
         y: 0,
      };
      this.scale = resizeCanvas(this.canvas);
      this.listen('resize', () => {
         this.scale = resizeCanvas(this.canvas);
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
         this.state.handleMouseDown(this.mouse, this.camera);
      });
      document.body.appendChild(this.canvas);
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
      this.ctx.fillStyle = BACKGROUND_COLOR;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.pathObject.render(this.ctx, this.camera);
      this.state.render(this.ctx, this.camera, this.path);
   }
   simulate() {
      this.state.simulate(this.mouse, this.camera);
   }
   panic() {
      this.tick = currentTick(this.startTime);
   }
   update() {
      const expectedTick = currentTick(this.startTime);
      let amount = 0;
      this.camera.interp(this.mouse.x, this.mouse.y, this.delta);
      while (this.tick < expectedTick) {
         if (this.events[this.tick]) {
            for (const func of this.events[this.tick]) {
               func();
            }
            delete this.events[this.tick];
         }
         this.simulate();
         if (amount >= SIMULATION_RATE * 2) {
            this.panic();
            break;
         }
         this.tick++;
         amount++;
      }
   }
};

/* debug to make spots
      this.spot = {
         x: 0,
         y: 0,
      };
      this.listen('keydown', (event) => {
         if (event.repeat) return;
         if (event.code === 'KeyW') {
            this.spot.y -= 20;
            this.state.spots.push(new Spot(this.spot.x, this.spot.y));
         }
         if (event.code === 'KeyS') {
            this.spot.y += 20;
            this.state.spots.push(new Spot(this.spot.x, this.spot.y));
         }
         if (event.code === 'KeyA') {
            this.spot.x -= 20;
            this.state.spots.push(new Spot(this.spot.x, this.spot.y));
         }
         if (event.code === 'KeyD') {
            this.spot.x += 20;
            this.state.spots.push(new Spot(this.spot.x, this.spot.y));
         }
         if (event.code === 'Space') {
            console.log(this.spot);
         }
      });
      > inside constructor
      */
