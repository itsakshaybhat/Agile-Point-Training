function* gen() {
  console.log(1);
  yield;
  console.log(2);
}

const g = gen();
let str = "Akshay Manjunath Bhat";
console.log(str.split(""));

let another = "mera bharath Mahan";
console.log(another.slice(5,9));

let given = "Java script is easy";
console.log(another.substring(5,9));

console.log(str.concat(" it is true ",another));

console.log(another.indexOf("B"));

let small = 'script';
console.log(given.includes(small));

console.log(given.replace("Easy", "evil"));


// console.log(trim("Akshay     is the bad           devops engineer"));
let x = "Akshay     is the bad           devops engineer";
console.log(x.trim().replace(/\s+/g,' '));

let str1="JavaScript is easy";
console.log(str. slice(10,4)) ;
console.log(str. substring(10,4)) 


let arr = [1,2,3,4,5,6,7,8];
console.log(arr.slice(0,5))
console.log( arr.join());
console.log(arr.length);
console.log(arr.push(2,90));
console.log(arr.pop());
console.log(arr);

arr.unshift(10);
console.log(arr);

