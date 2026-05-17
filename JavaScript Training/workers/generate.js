// Listen for messages from the main thread.
// If the message command is "generate", call `generatePrimes()`
addEventListener("message", (message) => {
  console.log("Worker received message:", message.data);
  if (message.data.command === "generate") {
    try {
      console.log("Starting to generate primes with quota:", message.data.quota);
      generatePrimes(message.data.quota);
    } catch (error) {
      console.error("Worker error:", error);
      postMessage({ error: error.message });
    }
  }
});

// Generate primes (very inefficiently)
function generatePrimes(quota) {
  if (typeof quota !== "number" || quota <= 0) {
    throw new Error("Quota must be a positive number");
  }

  function isPrime(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }

  const primes = [];
  const maximum = 1000000;

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }

  // When we have finished, send a message to the main thread,
  // including the number of primes we generated.
  console.log("Finished generating primes. Count:", primes.length);
  postMessage(primes.length);
}
