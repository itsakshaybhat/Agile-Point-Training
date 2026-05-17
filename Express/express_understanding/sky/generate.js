// const worker = new Worker("./callback.js");


// worker.postMessage({
//     command: "generate",
//     quota,
// });
// const hello = ()=>{
//     console.log("hello");
// }
// setTimeout(hello, 1000);


// const controller = new AbortController();

// setTimeout(() => controller.abort(), 5000); // cancel after 5s

// fetch(url, { signal: controller.signal })
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => {
//     if (err.name === "AbortError") {
//       console.log("Request timed out");
//     } else {
//       console.error(err);
//     }
//   });








// async function foo() {
//     console.log("result started \n");
//   const result1 = await new Promise((resolve) =>
//     setTimeout(() => resolve("1")),
//   );
//   console.log("result1 completed \n");
//   const result2 = await new Promise((resolve) =>
//     setTimeout(() => resolve("2")),
//   );
//   console.log("result2 completed \n");
//   console.log(result1,result2);
//   console.log("result completed \n");
// }
// foo();

console.log(globalThis);
let x = "hi";
const cre= ()=>{
    console.log("inside the create");
}
module.exports = {x,cre};