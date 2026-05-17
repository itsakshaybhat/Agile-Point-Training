// // class Trail{
// //     static fname = 'akshay';
// //     get val(){
// //         return Trail.fname;
// //     }
// // }

// // const span = new Trail();
// // console.log(span.val);



// // let [a , b] =[ 4, 2 ];
// // let x = ()=> console.log(a+b+100);
// // x();

// // class C {
// //   a = 1;
// //   constructor() {
// //     this.method = this.method.bind(this);
// //   }
// //   method() {
// //     console.log(this.a);
// //   }
// // }

// // new C().method();


// // console.log("-------------");


// // const obj = {
// //     num: 100,
// // }

// // globalThis.num = 42;
// // let x1 = 10;

// // function add(a, b, c,k) {
// //     return this.num + a + b +c +k;
// // }

// // console.log(add.call(obj,1,2,3,x1));

// // console.log(add.apply(obj,[1,2,3,x1]));

// // const boundAdd = add.bind(obj);
// // console.log(boundAdd(1,2,3,x1));








// const obj = {
//   num: 100,
// };

// // Setting "num" on globalThis to show how it gets picked up.
// let num = 42;
// // Arrow function
// const add = (a, b, c) => num + a + b + c;

// console.log(add.call(obj, 1, 2, 3)); // 48
// console.log(add.apply(obj, [1, 2, 3])); // 48
// const boundAdd = add.bind(obj);
// console.log(boundAdd(1, 2, 3)); // 48

// function countSelected(selectObject) {
//   let numberSelected = 0 ;
//   for(let i = 0 ; i < selectObject.options.length; i++){
//     if(selectObject.options[i].selected){
//       numberSelected++;
//     }
//   }
//   return numberSelected;
// }

// let i = 0;
// do {
//   console.log(i);
//   i++;
// } while(i<=10);

// let a = [1,2,3,4];
// const theValue = 3;
// for ( let i = 0 ; i< a.length ; i++){
//   if(a[i]===theValue){
//     console.log(i);
//     break;
//   }
// }



// let i = 0;
// let n = 0;
// while (i < 5) {
//   i++;
//   if (i === 3) {
//     continue;
//   }
//   n += i;
//   console.log(n);
// }
// Logs:
// 1 3 7 12



let i = 0;
let n = 0;
while (i < 5) {
  i++;
  if (i === 3) {
    continue;
  }
  n += i;
  console.log(n);
}
// Logs:
// 1 3 7 12




console.log("__________");
let x = [10,20,30,40,50];

for(let y in x){
  console.log(y);
}

for(let z of x){
  console.log(z);
}

const board = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

console.log(`${board.join("\n")}\n\n`);
board[4][4] = board[6][4];
board[6][4] = " ";
console.log(board.join("\n"));