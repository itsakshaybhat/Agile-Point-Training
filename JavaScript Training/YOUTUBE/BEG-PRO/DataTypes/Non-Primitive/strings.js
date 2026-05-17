let st = "Akshay";
let sr = 'Akshay';
let sm = "aKshay";

console.log(st,sr,sm);

console.log(st.length);
console.log(st[0]);

//Template Literals

let sum = 234;
let sentence = `The total sum of the business is ${sum}`;
console.log(sentence);
console.log(typeof sentence);


let obj = {
    item: "pen",
    price:10,
};

console.log(obj.item, obj.price);

let output;
console.log(`The objec items is ${obj.item} and its price ${obj.price}`);


//String interpolation 
// adding the dynamic value in the string literal as placeholder

// String Methods: It is used to manipulate a string. Built in functions

let str = "     akShay Manjunath BHaT";
let str2 = " Good Developer";
let x = str.toUpperCase();
console.log(x);
console.log(str.toLowerCase());
console.log(str.trim());
console.log(str.length); 

console.log((str.slice(0,12)).toLowerCase());  //Ending value is non inclusive value 
console.log(str.concat(str2));
console.log("hello".concat(2348327));
console.log(str.replace("BHaT", str2));
console.log(str.replace("a","ok"));
console.log(str.replaceAll("a","ok"));
console.log(str.charAt(5));





let fname = prompt("Enter the user name:");
console.log(`@${fname}${fname.length}`)
