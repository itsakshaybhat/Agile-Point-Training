// function web_dev(){
//     statements
// }
// web_dev();

function printing(msg) { //redundancy 
    console.log("first function statement");
    console.log("second function statement");
    console.log(msg);
};

printing(0);
printing();

function sum(x , y){
    sum = x + y;
    return sum;
}

let val = sum(10,20);
console.log(val);


const multi = (x, y) => {
    return x*y;
}
console.log(multi(10,20));

const sub = (a, b ) => {
    return a - b ;
}
console.log(sub(20,10));


function vowels(str) {
    let count = 0;
    let vowel = ['a','e','i','o','u','A','E','I','O','U'];
    for (let x of str) {
        if (vowel.includes(x)){
            count++;
        }
    }
    return count;
}

console.log(vowels("Akshay Manjunath Bhat@"), "is the number of vowle present in the string");

// let arr = [2,4,5,6,7,8];
// for (let x in arr){//index
//     console.log(x);
// }
// console.log("\n\n\n\n");

// for (let x of arr) {//value
//     console.log(x);
// }


const vowel = (str)=> {
    let count = 0
    str = str.toLowerCase();
    for(let x of str){
        if(x==='a' || x === 'e' || x ==='i' || x === 'o' || x === 'u' ){
            count++;
        }
    }
    return count;
}

console.log(vowel("Akshay"));


//Best way
const vowe = (str) => {
    let count =0 ;
    const vowelSet = new Set(['a','e','i','o','u']);
    for(let char of str.toLowerCase()){
        if (vowelSet.has(char)){
            count++;
        }
    } return count;
}
console.log(vowe("Akshay"));

//Callback

let arrr = [1,2,3,4,5,6,7];
arrr.forEach(function printVal(val){
    console.log(val);//for each vvalue and each index it is going ot print the value on the screen
});


let man = ["hille","ok","ha<"];
man.forEach((val,idx,arr)=>{
    console.log(val.toUpperCase(),idx,arr);
})


let sq = [445,23,976,432,678,2,9999999999999];
sq.forEach((val)=>{
    console.log(val**2);
});


// map

let nun = [3,35,5,6,78,9,2];
let newa = nun.map((val)=>{
    return val%10;
})
console.log(newa);


let olda = nun.filter((val) => {
    return val % 2 == 0 ;
})
console.log(olda);


// accc, curr, initialvalue
let vvv = nun.reduce((acc, curr) => {
    return acc + curr;
})

console.log(vvv);


let lar = nun.reduce((prev, next) => {
    return prev > next ? prev: next;
})

console.log(lar);


let score = [88,89,95,76,9,98,96,91,94,92,45];

let more = score.filter((val)=>{
    return val>90;
})
console.log(more);

let n = prompt("Enter the n as the input");
let arr = [];
for (let i = 1 ; i<=n ; i++){
    arr.push(i);
};

const x = arr.reduce((prev, curr) => {
    return prev + curr;
})
console.log(x);

const y = arr.reduce((prev, curr) =>{
    return prev * curr;
})
console.log(y);