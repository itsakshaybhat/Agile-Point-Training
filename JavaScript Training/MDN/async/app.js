const p = new Promise((res) => res(1));
async function asyncReturn() {return p};
function basicReturn() {return Promise.resolve(p)};
console.log(p ===  basicReturn());
console.log(p === asyncReturn());

async function foo() {
  console.log("1. This runs synchronously!");
  await Promise.resolve(); // Execution pauses here!
  console.log("3. This runs later, in the Microtask queue.");
}

foo();
console.log("2. Main thread continues...");

function setAlarm() {
    setTimeout(() => {
        console.log("Ok the time is complted");
    },2);
}

setAlarm();
