//Call back hell

function doStep(init, callback) {
  const res = init + 1;
  callback(res);
}

function doStep2(init, callback) {
  const res = init + 2;
  callback(res);
}

function doStep3(init, callback) {
  const res = init + 3;
  callback(res);
}

doStep(0, (result1) => {
  doStep2(result1, (result2) => {
    doStep3(result2, (result3) => {
      console.log(`Final result: ${result3}`);
    });
  });
});

// We ask for data. fetch() immediately hands us a "buzzer" (a pending Promise).
// const fetchPromise = fetch("https://example.com/data.json");

// console.log(fetchPromise); // Output: Promise { <state>: "pending" }

// // We tell the promise: "When you succeed, run this function"
// fetchPromise.then((response) => {
//   console.log(`Received response: ${response.status}`);
// });

// console.log("Started request…"); 

// CONSOLE OUTPUT ORDER:
// 1. Promise { <state>: "pending" }
// 2. Started request... (Main thread keeps moving!)
// 3. Received response: 200 (Happens later in the background)


// const request1 = fetch();
// const request2 = fetch();
// Promise.all([request1, request2])
//     .then((response) => console.log("both finished"))
//     .catch((error) => console.error(error));


// async function fetchProduct() {
//     try {
//         const response = await fetch();
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data[0].name);
//     } catch (error) {

async function getNumber(){
    // throw new Error(`Hi I am a new error`);
    return 44;
}

const myNum = getNumber() ;
// console.log(myNum);
// console.log(myNum[0].name);//can't read the properties undefined
myNum 
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message,`I am inside the error block`));


// getNumber().then(num => console.log(num));

let await = 10 ;
console.log(await) ;


function setAlarm() {
    setTimeout(() => {
        console.log("Ok the time is complted");
    },2);
}

// (removed commented fetch examples)
setAlarm();

