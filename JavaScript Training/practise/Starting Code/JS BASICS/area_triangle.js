// function area(height, base) {
//     let result = 0 ;
//     result = 0.5 * base * height;
//     return result ;
// }

// console.log(area(10, 5),"Square Units");


const l1 = 5;
const l2 = 4;
const l3 = 6;

let s = (l1 + l2 + l3) /2 ;
let area = Math.sqrt(s*(s-l1)*(s-l2)*(s-l3));
console.log(area);
