'use strict';

module.exports = function intersects(rect, mouse) {
   return mouse.x >= rect.x && mouse.x <= rect.x + rect.w && mouse.y > rect.y && mouse.y < rect.y + rect.h;
};
