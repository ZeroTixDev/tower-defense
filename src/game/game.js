'use strict';

const resizeCanvas = require('../util/resizeCanvas');
const Path = require('./path');
const Camera = require('./camera');
const { BACKGROUND_COLOR } = require('../util/constants');

module.exports = class Game {
   constructor() {
      this.wave = 0;
      this.towers = [];
      this.fov = 0.1;
      this.camera = new Camera();
      this.path = new Path(
         [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
            { x: 200, y: 300 },
            { x: 700, y: 400 },
            { x: 690, y: 250 },
            { x: 800, y: 250 },
            { x: 850, y: 200 },
            { x: 900, y: 100 },
            { x: 950, y: 150 },
            { x: 1000, y: 175 },
            { x: 1000, y: 200 },
            { x: 1100, y: 350 },
            { x: 1250, y: 200 },
            { x: 1300, y: 200 },
            { x: 1350, y: 300 },
            { x: 1400, y: 400 },
            { x: 1200, y: 500 },
            { x: 1000, y: 600 },
            { x: 500, y: 600 },
            { x: 450, y: 550 },
            { x: 300, y: 650 },
            { x: 400, y: 700 },
            { x: 1000, y: 750 },
            { x: 1300, y: 800 },
            { x: 1500, y: 850 },
            { x: 1600, y: 900 },
         ],
         70
      );
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      resizeCanvas(this.canvas);
      this.listen('resize', () => resizeCanvas(this.canvas));
      document.body.appendChild(this.canvas);
   }
   listen(type, func) {
      window.addEventListener(type, func.bind(this));
   }
   stop() {
      if (this.afr) {
         window.cancelAnimationFrame(this.afr);
      }
   }
   start() {
      (function run() {
         this.update();
         this.render();
         this.afr = requestAnimationFrame(run.bind(this));
      }.bind(this)());
   }
   render() {
      this.ctx.fillStyle = BACKGROUND_COLOR;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.path.render(this.ctx, this.camera);
   }
   update() {}
};
