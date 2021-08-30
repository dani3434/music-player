// carrossel
const carosel = [...document.querySelectorAll('.carousel img')];
const activeClass = 'active';

let caroselImageIndex = 0;

const changeCarousel = () => {
  carosel[caroselImageIndex].classList.toggle(activeClass);

  if(caroselImageIndex >= carosel.length -1) {
    caroselImageIndex = 0;
  } else {
    caroselImageIndex++;
  }
  carosel[caroselImageIndex].classList.toggle(activeClass);

}

setInterval(() => {
  changeCarousel();
},3000);

// Navegação
// music player toggle
const musicPlayerSection = document.querySelector('.music-player-section');
const controls = document.querySelector('.controls');

let clickCount = 1;

musicPlayerSection.addEventListener('click', (event) => {
  if(clickCount >= 2 && event.target == controls){
    musicPlayerSection.classList.add(activeClass);
    clickCount = 1;
    return;
  }

  clickCount++

  setTimeout(() => {
   clickCount = 1;
  },250);
})

// Funcionalidade de voltar dentro da da seção music player
const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
backToHomeBtn.addEventListener('click', () => {
  musicPlayerSection.classList.remove(activeClass);
})

// Funcionalidade para acessar a playlist
const playlistButton = document.querySelector('.music-player-section .nav-btn');
const playlistSection = document.querySelector('.playlist');
const backToMusicPlayer = playlistSection.querySelector('.back-btn');

playlistButton.addEventListener('click', () => {
  playlistSection.classList.add(activeClass);
})

// Funcionalidade para voltar para o player de música
backToMusicPlayer.addEventListener('click', () => {
  playlistSection.classList.remove(activeClass);
})

// Music player
let currentMusic = 0;
const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

// Seleção dos butões
const fowardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

// Btns Clique Events
playBtn.addEventListener('click', () => {
  music.play();
  playBtn.classList.remove(activeClass);
  pauseBtn.classList.add(activeClass);
})

pauseBtn.addEventListener('click', () => {
  music.pause();
  playBtn.classList.add(activeClass);
  pauseBtn.classList.remove(activeClass);
})

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;

  music.src = song.path;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  coverImage.src = song.cover;

  setTimeout(() => {
   seekBar.max = music.duration;
   musicDuration.innerHTML = formatTime(music.duration);
  },600);

  currentMusic.innerHTML = '00 : 00';
  queue.forEach(item => item.classList.remove(activeClass));
  queue[currentMusic].classList.add(activeClass);
}

setMusic(songs.length - 1);


// Formatação da duração em 00:00
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if(min < 10){
    min = `0` + min;
  }

  let sec = Math.floor(time % 60);
  if(sec < 10) {
    sec =  `0` + sec;
  }

  return `${min} : ${sec}`;
}

// seekbar eventos
setInterval(() => {
  seekBar.value = music.currentTime;
  currentMusicTime.innerHTML = formatTime(music.currentTime);

  if(Math.floor(music.currentTime) === Math.floor(seekBar.max)) {
    if(repeatBtn.className.includes(activeClass)){
      setMusic(currentMusic);
      playBtn.click();
    }else {
      fowardBtn.click();
    }
  }

},500);

seekBar.addEventListener('input',() => {
  music.currentTime = seekBar.value;
  seekBar.value = music.currentTime;
})

// Foward btn 
fowardBtn.addEventListener('click', () => {

  if(currentMusic >= songs.length - 1){
     currentMusic = 0;
  } else {
    currentMusic++
  }
  setMusic(currentMusic);
   playBtn.click();
})

// backward btn

backwardBtn.addEventListener('click', () => {

  if(currentMusic <= 0){
     currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
})

// repeat button
repeatBtn.addEventListener('click', () => {
  repeatBtn.classList.toggle(activeClass);
})

// Volume section
volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle(activeClass);
  volumeSlider.classList.toggle(activeClass);
})

volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value;
})

// Playlist
queue.forEach((item,index) => {
  item.addEventListener('click', () => {
    setMusic(index);
    playBtn.click();
  })
})