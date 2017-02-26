let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const timerButtons = Array.from(document.querySelectorAll(".timer__button"));
const customTimeForm = document.customForm;
const customTimeInput = customTimeForm.minutes;

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + (seconds * 1000);
  displayEndTime(then);
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      displayTimeLeft(secondsLeft);
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" + remainderSeconds : remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const display = `Back at ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  endTimeDisplay.textContent = display;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function startCustomTimer(e) {
  e.preventDefault();
  const timeInMinutes = parseInt(customTimeInput.value);
  if (timeInMinutes > 0) {
    const timeInSeconds = timeInMinutes * 60;
    timer(timeInSeconds);
  }
  this.reset();
}

timerButtons.forEach(button => button.addEventListener("click", startTimer));
customTimeForm.addEventListener("submit", startCustomTimer);
