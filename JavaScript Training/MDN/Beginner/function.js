// console.log(square(5)); // Output: 25

// function square(number) {
//   return number * number;
// }

const cube = function(x) {
  return x * x * x;
};

// Named Expression (Useful for debugging stack traces if it crashes)
const factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1);
};


function changeNumber(num){
    num = 99;
}
let myAge = 22;
changeNumber(myAge);
console.log(myAge);

function changeCar(carObj) {
    carObj.make = "Toyota";
}
const myCar = {make: "Honda"};
changeCar(myCar);
console.log(myCar.make);

function countdown(i) {
    if (i < 0) return ;
    console.log(`begin: ${i}`);
    countdown(i-1);
    console.log(`end: ${i}`);
}
countdown(2);


// Immediately Invoked function Expression
const secretKey = (function() {
    const p = "234";
    const t = "abc";
    return p + t;
})();
console.log(secretKey);


// closures and scopes 
function createBank(initialBalance){
    let bal = initialBalance;
    return {
        deposit: function(amount) {
            bal +=amount;
        },
        getbalance: function() {
            return bal;
        }
    };
}

const myAccount = createBank(100);
myAccount.deposit(5000);
console.log(myAccount.getbalance());

function oldConcat() {
    let res = "";
    for (let i =0 ; i< arguments.length; i++){
        res +=arguments[i] ;
    }
    return res;
}
console.log(oldConcat("A", "B", "C"));

function modernMath(multiplier = 1, ...numbers) {
    return numbers.map(num=> num*multiplier);
}
console.log(modernMath(10,1,2,3));

function Player() {
    this.score = 0;
    const self = this;
    setInterval(function() {
        self.score++;
    },1000);

setInterval(()=>{
    this.score ++;
},1000);
}

// function map(f,a) {
//     const res = new Array(a.length);
//     for ( let i = 0 ; i < a.length; i++) {
//         res[i] = f(a[i]);
//     }
//     return result;
// }
// const numbers = [0,1,2,5,10];
// const cubedNumbers = map(function(x){
//     return x * x* x;
// }, numbers);


function map(f,a){
    const result = new Array(a.length);
    for (let i=0;i<a.length;i++){
        result[i] = f(a[i]);
    }
    return result;
}
const numbers = [1,2,3,5,6,8,9];
const cubedvalue = map(function (x) {
    return x * x * x;
}, numbers);
console.log(cubedvalue);

// You can literally build a function out of text strings!
const dynamicMultiply = new Function('a', 'b', 'return a * b');

console.log(dynamicMultiply(2, 6)); // Output: 12


function walkTree(node) {
    if (node === null) {
        return ;
    }
    for (const child of node.childNodes){
        walkTree(child);
    }
}