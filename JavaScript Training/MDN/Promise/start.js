// new Promise((resolveOuter) => {
//     resolveOuter(
//         new Promise((resolveInner) => {
//             setTimeout(resolveInner, 1000);
//         });
//     );
// });

const myPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve("foo");
    },300);
});

myPromise 
    .then(handleFullfilledA, handleRejectedA)
    .then(handleFullfilledB, handleRejectedB)
    .then(handleFullfilledC, handleRejectedC);


myPromise 
    .then((value) => `${value} and bar`)
    .then((value) => `${value} and bar`)
    .then((value) => `${value} and bar`)
    .then((value) => `${value} and bar`)
    .then((value) => `${value} and bar`)
    .then((value) => {
        console.log(value);
    })
    .catch((erro)=> {
        console.error(err);
    })

    const promiseA = new Promise(myExecutorFunc);
    const promiseB = promiseA.then(handleFullfilled1, handleFullfilled1);
    const promiseC = promiseA.then(handleFullfilled2, handleFullfilled2);




    const promisA = new Promise((resolve, reject) => {
        resolve(777);
    });
    promisA.then((val)=> console.log("Asynchronous logging has val:", val));
    console.log("immediate logging");


const thenable = {
    then(onFullfilled, onRejected){
        onFullfilled({
            then(onFullfilled, onRejected) {
                onFullfilled(42);
            }
        })
    }
}
Promise.resolve(thenable);


// >Promise.all 
// >Promise.allSettled()
// >Promise.any() 1- fullfill, otherwise any reject means reject that promise
// >Promise.race()


const myFirstPromise = new Promise((resolve, reject)=>{
    setTimeout(()=> {
        resolve("success");
    },250);
});

myFirstPromise.then((successMessage) => {
    console.log(`Yay!!!, ${successMessage}`);

})





















// To experiment with error handling, "threshold" values cause errors randomly
const THRESHOLD_A = 8; // can use zero 0 to guarantee error

function tetheredGetNumber(resolve, reject) {
  setTimeout(() => {
    const randomInt = Date.now();
    const value = randomInt % 10;
    if (value < THRESHOLD_A) {
      resolve(value);
    } else {
      reject(new RangeError(`Too large: ${value}`));
    }
  }, 500);
}

function determineParity(value) {
  const isOdd = value % 2 === 1;
  return { value, isOdd };
}

function troubleWithGetNumber(reason) {
  const err = new Error("Trouble getting number", { cause: reason });
  console.error(err);
  throw err;
}

function promiseGetWord(parityInfo) {
  return new Promise((resolve, reject) => {
    const { value, isOdd } = parityInfo;
    if (value >= THRESHOLD_A - 1) {
      reject(new RangeError(`Still too large: ${value}`));
    } else {
      parityInfo.wordEvenOdd = isOdd ? "odd" : "even";
      resolve(parityInfo);
    }
  });
}

new Promise(tetheredGetNumber)
  .then(determineParity, troubleWithGetNumber)
  .then(promiseGetWord)
  .then((info) => {
    console.log(`Got: ${info.value}, ${info.wordEvenOdd}`);
    return info;
  })
  .catch((reason) => {
    if (reason.cause) {
      console.error("Had previously handled error");
    } else {
      console.error(`Trouble with promiseGetWord(): ${reason}`);
    }
  })
  .finally((info) => console.log("All done"));