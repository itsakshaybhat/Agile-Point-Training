// const obj1 = {
//     name: "akshay",
//     rollno: 25
// };
// const obj2 = {
//     name: "Rahul",
//     roolno: 24
// };
// console.log(obj1.name);
// console.log(obj1.name === obj2.name);
// console.log(obj1 === obj2);


const objectEqual = (a,b) =>{
    return Object.keys(a).every(key=> a[key] === b[key]);
}

const a = {a:1, b:2, c:3};
const b = {a:1, b:2, c:3};
const c = {a:1, b:2, d:3};
console.log(objectEqual(a,b));
console.log(objectEqual(a,c));
console.log(objectEqual(b,c));