'use strict';

const resizeCanvas = require('../util/resizeCanvas');
const Path = require('./path');
const Camera = require('./camera');
const State = require('./state');
const Spot = require('./spot');
const { GAME, CONTROLS, THEME_SONG } = require('../util/constants');
const currentTick = require('../util/currentTick');
const setCursor = require('../util/setCursor');
const { loadSound, loadImage } = require('../util/loadAsset');

module.exports = class Game {
   constructor() {
      this.themeSong = loadSound('theme.wav');
      this.themeSong.volume = THEME_SONG.volume;
      this.themeSong.loop = THEME_SONG.loop;
      this.themeSong.playbackRate = THEME_SONG.rate;
      this.textures = {
         background: loadImage('background.png'),
      };
      this.playAudio();
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
            wave: null,
         },
      };
      this.GUI.ctx = this.GUI.canvas.getContext('2d');
      this.ctx = this.canvas.getContext('2d');
      this.backgroundPattern = this.ctx.createPattern(this.textures.background, 'repeat');
      this.state = new State(this.map);
      this.makeSpots();
      this.tick = 0;
      this.time = window.performance.now();
      this.startTime = window.performance.now();
      this.paused = false;
      this.mouse = {
         x: 0,
         y: 0,
         down: false,
      };
      this.controls = CONTROLS;
      Object.keys(this.controls).map((key) => {
         const control = this.controls[key];
         if (control.keylock) {
            control.locked = false;
         }
      });
      this.resize();
      this.applyEventListeners();
      document.body.appendChild(this.canvas);
      document.body.appendChild(this.GUI.canvas);
      document.children[0].style.backgroundImage = 'none';
      document.children[0].style.backgroundColor = GAME.background_color;
   }
   playAudio() {
      const audio = loadSound('start.wav');
      audio.play();
      audio.addEventListener('ended', () => {
         this.themeSong.play();
      });
   }
   applyEventListeners() {
      this.listen('resize', () => {
         this.resize();
      });
      this.listen('mousemove', (event) => {
         const bound = this.canvas.getBoundingClientRect();
         this.mouse.x = Math.round((event.pageX - bound.left) / this.scale);
         this.mouse.y = Math.round((event.pageY - bound.top) / this.scale);
      });
      this.listen('keydown', this.trackKeys.bind(this));
      this.listen('keyup', this.trackKeys.bind(this));
      this.listen('mousedown', () => {
         this.mouse.down = true;
         if (this.paused) return;
         this.state.handleMouseDown(this.mouse, this.camera);
      });
      this.listen('mouseup', () => {
         this.mouse.down = false;
      });
   }
   pauseOverlay(ctx) {
      ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      const outerRadius = this.canvas.width * 0.5;
      const innerRadius = this.canvas.height * 0.2;
      const grd = ctx.createRadialGradient(
         this.canvas.width / 2,
         this.canvas.height / 2,
         innerRadius,
         this.canvas.width / 2,
         this.canvas.height / 2,
         outerRadius
      );
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,0,0,' + 0.6 + ')');
      ctx.fillStyle = grd;
      ctx.fill();
   }
   resize() {
      this.scale = resizeCanvas(this.canvas);
      resizeCanvas(this.GUI.canvas);
   }
   trackKeys(event) {
      if (event.repeat) return;
      const control = this.controls[event.key.toLowerCase()];
      if (!control) return;
      switch (control.type) {
         case 'pause':
            if (control.keylock && event.type === 'keyup') {
               control.locked = false;
               return;
            }
            if ((control.keylock && !control.locked) || !control.keylock) {
               this.paused ? this.unpause() : this.pause(); // what happens when you clicked pause
               if (control.keylock) {
                  control.locked = true;
               }
            }
            break;
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
      this.state.spawnWave(this);
      this.lastTime = 0;
      (function run(time = 0) {
         this.delta = (time - this.lastTime) / 1000;
         this.lastTime = time;
         this.update();
         this.render();
         this.afr = requestAnimationFrame(run.bind(this));
      }.bind(this)());
   }
   drawBackgroundPattern(ctx) {
      ctx.save();
      ctx.translate(-this.camera.x * this.camera.scale, -this.camera.y * this.camera.scale);
      ctx.fillStyle = this.backgroundPattern;
      ctx.fillRect(
         this.camera.x * this.camera.scale,
         this.camera.y * this.camera.scale,
         this.canvas.width,
         this.canvas.height
      );
      ctx.restore();
   }
   render() {
      this.drawBackgroundPattern(this.ctx);
      // this.ctx.fillStyle = GAME.background_color;
      // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.pathObject.render(this.ctx, this.camera);
      this.state.render(this.ctx, this.camera, this.GUI);
      if (this.paused) {
         this.pauseOverlay(this.ctx);
      }
   }
   simulate() {
      this.state.simulate(this);
   }
   pause() {
      this.paused = true;
      this.time = window.performance.now();
      setCursor('default');
      this.themeSong.playbackRate = THEME_SONG.paused_rate;
   }
   unpause() {
      this.startTime += window.performance.now() - this.time;
      this.time = window.performance.now();
      this.paused = false;
      this.themeSong.playbackRate = THEME_SONG.rate;
   }
   update() {
      this.camera.interp(this.mouse.x, this.mouse.y, this.delta);
      if (this.paused) return;
      let expectedTick = currentTick(this.startTime);
      if (expectedTick - this.tick > GAME.simulation_rate / 3) {
         this.startTime += window.performance.now() - this.time;
         expectedTick = this.tick;
      }
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
