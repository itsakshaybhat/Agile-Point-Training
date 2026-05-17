// const timeId = setTimeout(()=>{
//     console.log("Time is up");
// },10);


// function greet(firstName , role){
//     console.log(`Hello ${firstName}, you are hired as an ${role}`);
// }

// setTimeout(greet, 2000, "Akshay", "Software Engineer");

// const my = {
//     myProperty: 12,
//     log() {
//         console.log(`myProperty: ${this.myProperty}`);
//     }
// };

// my.log();

// setTimeout(my.log, 1000); //undefined**

// setTimeout(() => {
//     my.log();
// }, 1000);

// setTimeout(my.log.bind(my), 1000);

// const date = new Date();
// console.log(date);
// console.log(date.getDate());
// console.log(date.getMonth());
// console.log(date.getFullYear());
// console.log(date.getMilliseconds());


// let count = 0;

// function run() {
//   const start = Date.now();

//   setTimeout(() => {
//     const delay = Date.now() - start;
//     console.log(delay);
//     console.log(`Iteration ${count}, delay: ${delay}ms`);

//     count++;
//     if (count < 10) {
//       run(); // nested setTimeout
//     }
//   }, 0);
// }

// run();

// setTimeout("alert('Potentially evil code!');", 1000);//Not recommendeed because of hack


let timeoutId = setTimeout(()=> console.log("Kaboom!"), 5000);
clearTimeout(timeoutId);

