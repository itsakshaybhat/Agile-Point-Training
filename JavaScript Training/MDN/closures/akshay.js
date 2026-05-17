function makeAdder(x) {
  let z = 10;
  return function (y) {
    return x + y +z; // It remembers 'x' forever in its closure backpack!
  };
}


let add5;
console.log(add5 = makeAdder(5)(2)); // 'x' is permanently locked as 5
const add10 = makeAdder(10)(5); // 'x' is permanently locked as 10

console.log(add5);
// console.log(add5(2)); // 7
// console.log(add10(2)); // 12


 
function MyObject1(name) {
  this.name = name;
}

class MyObject {
  constructor(name) {
    this.name = name;
  }
} 

MyObject.prototype.corona = function() {
    return this.name;
}
MyObject1.prototype.corona = function() {
    return this.name;
}

const obj = new MyObject("akshay");
const obj1 = new MyObject1("akshay");
console.log(obj.corona());
console.log(obj1.corona());