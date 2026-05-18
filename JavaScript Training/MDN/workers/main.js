// Create a new worker, giving it the code in "generate.js"
const worker = new Worker("./generate.js");

// Add error handling for the worker
worker.addEventListener("error", (error) => {
  console.error("Worker error:", error);
  document.querySelector("#output").textContent =
    `Error: ${error.message}`;
});

// When the user clicks "Generate primes", send a message to the worker.
// The message command is "generate", and the message also contains "quota",
// which is the number of primes to generate.
document.querySelector("#generate").addEventListener("click", () => {
  const quotaInput = document.querySelector("#quota").value;
  console.log("Input value:", quotaInput);

  const quota = parseInt(quotaInput, 10);
  console.log("Parsed quota:", quota);

  // Validate the input
  if (isNaN(quota) || quota <= 0) {
    console.log("Invalid input!");
    document.querySelector("#output").textContent =
      "Please enter a valid positive number!";
    return;
  }

  console.log("Sending message to worker with quota:", quota);
  document.querySelector("#output").textContent = "Generating primes...";

  worker.postMessage({
    command: "generate",
    quota,
  });
});

// When the worker sends a message back to the main thread,
// update the output box with a message for the user, including the number of
// primes that were generated, taken from the message data.
worker.addEventListener("message", (message) => {
  console.log("Received message from worker:", message.data);
  if (message.data.error) {
    document.querySelector("#output").textContent =
      `Error: ${message.data.error}`;
  } else {
    document.querySelector("#output").textContent =
      `Finished generating ${message.data} primes!`;
  }
});

document.querySelector("#reload").addEventListener("click", () => {
  document.querySelector("#user-input").value =
    'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});