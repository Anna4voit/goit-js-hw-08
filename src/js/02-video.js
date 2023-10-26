import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
//Ініціалізуємо плеєр
const player = new Player(iframe, {
  loop: true,
  quality: '1080p',
  fullscreen: true,
});

const LS_TIME_KEY = 'videoplayer-current-time';

//функція для збереження  поточного часу відтворення відео
const getCurrentTime = function (currentTime) {
  const seconds = currentTime.seconds;
  localStorage.setItem(LS_TIME_KEY, seconds);
};

// подія timeupdate - оновлення часу відтворення.
player.on('timeupdate', throttle(getCurrentTime, 1000));

//Під час перезавантаження сторінки відновлюємо відтворення зі збереженої позиції.
player.setCurrentTime(localStorage.getItem(LS_TIME_KEY) || 0);
