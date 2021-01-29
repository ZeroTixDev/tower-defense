'use strict';

function fastFind(array, value) {
   for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return { index: i };
   }
   return false;
}
function generateId(array = [], generate = () => {}) {
   let uniqueId = generate();
   let amount = 0;
   while (true) {
      amount++;
      if (amount > 100) {
         throw new Error('cannot find a unique id in the window.sounds array');
      }
      if (fastFind(array, uniqueId)) {
         uniqueId = generate();
         continue;
      }
      break;
   }
   return uniqueId;
}
module.exports = function play(audio) {
   if (window.sounds.length < window.maxSounds) {
      audio.play();
      audio.id = generateId(window.sounds, () => {
         return Math.round(Math.random() * 200);
      });
      window.sounds.push(audio.id);
      audio.addEventListener('ended', () => {
         const index = fastFind(window.sounds, audio.id);
         if (index) {
            window.sounds.splice(index, 1);
         }
      });
   }
};
