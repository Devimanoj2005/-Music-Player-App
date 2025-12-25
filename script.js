// Song list
const songs = [
  {
    name: "Song One",
    file: "song1.mp3"
  },
  {
    name: "Song Two",
    file: "song2.mp3"
  },
  {
    name: "Song Three",
    file: "song3.mp3"
  }
];

let currentIndex = 0;

// Get elements
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Load first song on page load
loadSong(currentIndex);

// Load song function
function loadSong(index) {
  title.innerText = songs[index].name;
  audio.src = songs[index].file;
  playBtn.innerText = "▶️";
}

// Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶️";
  }
});

// Next song
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= songs.length) {
    currentIndex = 0;
  }
  loadSong(currentIndex);
  audio.play();
  playBtn.innerText = "⏸";
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = songs.length - 1;
  }
  loadSong(currentIndex);
  audio.play();
  playBtn.innerText = "⏸";
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Seek music
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.value = 0.5; // default volume
audio.volume = 0.5;

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto play next song when current ends
audio.addEventListener("ended", () => {
  nextBtn.click();
});
