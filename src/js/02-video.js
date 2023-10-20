import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const options = {
  loop: false,
};
const player = new Player(iframe, options);
console.log(player);

player.on('timeupdate', () => {
  let seconds = player.CurrentTime;
  console.log(seconds);
});

// const player = new Player('handstick', {
//   id: 19231868,
//   width: 640,
// });

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });
