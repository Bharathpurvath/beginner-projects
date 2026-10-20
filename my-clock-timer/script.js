const clockElement = document.querySelector("#clock");
const dateElement = document.querySelector("#date");

const minutesInput = document.querySelector("#minutes-input");
const secondsInput = document.querySelector("#seconds-input");
const timerDisplay = document.querySelector("#timer-display");
const timerStatus = document.querySelector("#timer-status");

const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");

let remainingSeconds = 5 * 60;
let timerInterval = null;

function updateClock() {
  const now = new Date();

  clockElement.textContent = now.toLocaleTimeString();
  dateElement.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function getInputTimeInSeconds() {
  const minutes = Number(minutesInput.value);
  const seconds = Number(secondsInput.value);

  if (
    minutesInput.value === "" ||
    secondsInput.value === "" ||
    !Number.isInteger(minutes) ||
    !Number.isInteger(seconds) ||
    minutes < 0 ||
    minutes > 999 ||
    seconds < 0 ||
    seconds > 59
  ) {
    timerStatus.textContent = "Enter valid minutes and seconds (0–59 seconds).";
    return null;
  }

  const total = minutes * 60 + seconds;

  if (total === 0) {
    timerStatus.textContent = "Set a time greater than zero.";
    return null;
  }

  return total;
}

function startTimer() {
  if (timerInterval !== null) return;

  if (remainingSeconds <= 0) {
    const inputTime = getInputTimeInSeconds();
    if (inputTime === null) return;
    remainingSeconds = inputTime;
    updateTimerDisplay();
  }

  timerStatus.textContent = "Timer is running.";

  timerInterval = setInterval(() => {
    remainingSeconds -= 1;
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      remainingSeconds = 0;
      updateTimerDisplay();
      timerStatus.textContent = "Time’s up!";
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval === null) {
    timerStatus.textContent = "Timer is paused.";
    return;
  }

  clearInterval(timerInterval);
  timerInterval = null;
  timerStatus.textContent = "Timer paused.";
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  const inputTime = getInputTimeInSeconds();
  if (inputTime === null) {
    remainingSeconds = 0;
    updateTimerDisplay();
    return;
  }

  remainingSeconds = inputTime;
  updateTimerDisplay();
  timerStatus.textContent = "Timer reset. Press Start when ready.";
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

minutesInput.addEventListener("input", () => {
  if (timerInterval === null) resetTimer();
});

secondsInput.addEventListener("input", () => {
  if (timerInterval === null) resetTimer();
});

updateClock();
setInterval(updateClock, 1000);
updateTimerDisplay();