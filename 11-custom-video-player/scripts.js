/* Get elements */
const player = document.querySelector(".player video");
const playerButton = document.querySelector(".player__button");
const progressBar = document.querySelector(".progress .progress__filled");
const timeBar = document.querySelector(".progress");
const volumeSlider = document.querySelector("input[name='volume']");
const playbackRateSlider = document.querySelector("input[name='playbackRate']");
const timeJumpButtons = document.querySelectorAll("button[data-skip]");
/* Build functions */
function togglePlay(e) {
  if (player.paused) {
    player.play();
    playerButton.innerHTML = "||";
  } else {
    player.pause();
    playerButton.innerHTML = "►";
  }
}

function progressUpdate(e) {
  progressBar.style.flexBasis = `${(player.currentTime/player.duration)*100}%`;
}

function moveTime(e) {
  console.log(e.keyCode);
  if (e.keyCode !== 37 && e.keyCode !== 39) return;
  if (e.keyCode === 37) {
    player.currentTime = player.currentTime - 5;
  } else {
    player.currentTime = player.currentTime + 5;
  }
}

function changeVolume(e) {
  player.volume = volumeSlider.value;
}

function keyBoardChangeVolume(e) {
  if (e.keyCode !== 38 && e.keyCode !== 40) return;
  if (e.keyCode === 38) {
    player.volume = player.volume + 0.1;
  } else {
    player.volume = player.volume - 0.1;
  }

  volumeSlider.value = player.volume;
}

function changePlaybackRate(e) {
  player.playbackRate = playbackRateSlider.value;
}

function timeJump(e) {
  player.currentTime = player.currentTime + Number.parseInt(this.dataset["skip"]);
}

function changeTime(e) {
  const segment = player.duration/player.videoWidth;
  player.currentTime = segment * e.offsetX;
}

/* Hook up event listeners */
playerButton.addEventListener("click", togglePlay);
player.addEventListener("timeupdate", progressUpdate);
volumeSlider.addEventListener("input", changeVolume);
playbackRateSlider.addEventListener("input", changePlaybackRate);
timeJumpButtons.forEach(button => button.addEventListener("click", timeJump));
timeBar.addEventListener("click", changeTime);
window.addEventListener("keydown", moveTime);
window.addEventListener("keydown", keyBoardChangeVolume);


progressBar.style.flexBasis = "0%";
