const time = document.querySelector(".time");
const start = document.querySelector(".start");
const btnpause = document.querySelector(".btnpause");
const btnreset = document.querySelector(".btnreset");

let seconds = 0;
let minutes = 0;
let hour = 0;

let timer = null;

time.textContent = `${String(hour).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;;

function updateTimer() {
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hour++;
  }
  renderTime();
  }

const renderTime = ()=>{
  time.textContent = `${String(hour).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;;
}

function timeInterval() {
  if(timer){
    return ;
  }

  start.textContent = "Start";
  timer = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

start.addEventListener("click", timeInterval);

function timePause() {
  clearInterval(timer);
  start.textContent = "Resume";
  timer = null;
}
btnpause.addEventListener("click", timePause);

function timeReset() {
  clearInterval(timer);
  start.textCotent = "Start";
  timer = null;
  seconds = 0;
  minutes = 0;
  hour = 0;
  updateTimer();
}

btnreset.addEventListener("click", timeReset);

