let timeoutID;

function setOutput(outputContent) {
    document.querySelector("#output").textContent = outputContent;
}

function delayedMessage() {
    setOutput("");
    timeoutID = setTimeout(setOutput, 2 * 1000, "That was a really slow");
}

function clearMessage() {
    clearTimeout(timeoutID);
}

document.getElementById("show").addEventListener("click", delayedMessage);
document.getElementById("cancel").addEventListener("click", clearMessage);


console.log(new Date().getMilliseconds());

let last = 0;
let iterations = 10;

function timeout() {
  const now = new Date().getMilliseconds();
  console.log(now, "-->", last);
  console.log(`Actual delay: ${now - last}ms`);
  last = now;
  
  if (iterations-- > 0) {
    setTimeout(timeout, 0); // Scheduling a 0ms delay!
  }
}

last = new Date().getMilliseconds();
setTimeout(timeout, 0);

// If you ran this, the first 4 logs would show ~0ms delays.
// The 5th log and onward would suddenly jump to ~4ms delays!