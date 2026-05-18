// Array:collection of items

// let mark = 20;
// let mark1 = 20;
// let mark2= 20;
// let mark3 = 20;
// let mark4 = 20;

// let marks = {stu1: 97,stu2: 89,stu3: 90,}
let marks = [97, 89, 90];
console.log(typeof marks);
let heros = ["akshay", "abhay", "vinay", "kajariya",'veena'];
console.log(heros);
console.table(heros);
console.log(marks);
console.table(marks);
console.log(typeof marks);


//Indexes
console.log(marks[2]);

marks[2] = 43;
console.log(marks);

let arr = [3,4,1,4,5,6,7,89,4,3,2,4,5];
// for(x in arr){
//     console.log(arr[x]);
// }
// arr = [3,4,1,4,5,6,7,89,4,3,2,4,5];

// for (let y in arr) {
//     console.log(y, arr[y]+5);
// } //This in will give the value's index


for (let m of arr){
    console.log(m,"->",m+1);
} //The m will give the value directly




let student = [85,97,44,37,76,60];
let avg = 0 ;
for (let x of student){
    avg = avg + x;
}
console.log(avg)
console.log(avg/student.length);


let a1 = [ 250,645,300,900,50];
let a2 = [];
let val = 0;
for (let x of a1){
    val = x*0.1;
    a2.push(val);
}
console.log(a2);


let a = [250,645,300,900,50];
for (let i in a ) {
    a[i] = a[i] - a[i] * 0.1;
}
console.log(a);


//Methods in arrays

let num = [234,23,1,3,5,7,8,9,6,2];
// push//to add element at end
num.push("Apple")
console.log(num);

num.push("Bugrger", true, false, Symbol("hi"),BigInt(245));
console.table(num);

num.pop(); //The pop and push will altered in the original element
num.pop();
num.pop();

console.log(num);

let aksh = num.toString();
console.table(aksh);

console.log(typeof aksh);
console.log(typeof num);





let x1 = [ 10, 20 ];

let x2 = [30, 40];
let res = x1.concat(x2,x2);
console.log(res);

x1.unshift("akshay");
console.log(res);
console.log(x1);
res = x1.shift();
console.log(res);
console.log(x1); //cahnges made in the original array.
console.log(x1.shift());
console.log(x1);

const amar = [234,234,2,3,4,5,6,7,8,9,10 ];
console.log(amar);
console.log(amar.slice(1,5));
console.log(amar.slice(5,));
console.log(amar.slice(0,));
console.log(amar.slice(6));


//Splice
// splice(start, delCount, newElement);

let cmpy = [3,4,5,6,7,8,"hello" , true];
cmpy.splice(5,0, 102,103,104);

console.log(cmpy);


let companies = ["Bloomberg", "Microsoft", "Uber","Google","IBM", "Netflix"];
//a
companies.shift();
console.log(companies);
companies.splice(1,1,"Ola");
console.log(companies);
companies.push("Amazon");
console.log(companies);