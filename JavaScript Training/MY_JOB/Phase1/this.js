// this
// const user = {
//     username: "Akshay Bhat",
//     age: 23,
//     login: function() {
//         console.log(`${this.username} is the logged in person at the age of ${this.age}`);
//     }
// }

// user.login()



// // "use strict";
// function showStatus(){
//     console.log(this);
// }
// showStatus() ;


// const server = {
//     port :8000,
//     login:(x)=> {
//         console.log(`${x} is the prefered port value`);
//     }
// }
// let x = 10 ;
// server.login(x);


// const obj = {
//     name:"Akshay",
//     regular:function() {
//         setTimeout(function () {
//             console.log(this.name); //Undefined
//         }, 1000);
//     },
//     arrow: function() {
//         setTimeout(()=> {
//             console.log(this.name);
//         },1000);
//     }
// };

// obj.regular();
// obj.arrow();


// const obj1 = {
//   name: "Akshay",

//   method1() {
//     console.log(this.name); // "Akshay"
//   },

//   method2: () => {
//     console.log(this.name); // undefined
//   }
// };

// obj1.method1();
// obj1.method2();






// const ob2 = {
//   name: "Akshay",
//   fn: () => {
//     console.log(this.name);
//   }
// };

// obj.fn();



// const obj = {
//   name: "Akshay",
//   fn: function() {
//     return function() {
//       console.log(this.name);
//     };
//   }
// };

// obj.fn()();

// const obj = {
//   name: "Akshay",
//   fn: function() {
//     return () => {
//       console.log(this.name);
//     };
//   }
// };

// obj.fn()();


// const obj = {
//   name: "Akshay",
//   fn: function() {
//     const inner = () => {
//       console.log(this.name);
//     };
//     return inner;
//   }
// };

// const f = obj.fn();
// f();