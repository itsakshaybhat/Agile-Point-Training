//Primitive Data type
// number 
 console.log("\Numbers\n")
let age = 23;
console.log(age);
let marks = 234.5;
console.log(marks);
console.log(typeof(age), typeof(marks));

console.log("\nStrings\n")
//String

const nama = "Akshay";
console.log(nama, typeof(nama));
const anohter = 'Amarnath';
console.log(anohter, typeof(anohter));


console.log("\Boolean\n");
let pass = true;
console.log(pass, typeof(pass));
let fail = false;
console.log(fail, typeof(fail));




console.log("\nUndefined\n");
let x ;
console.log(x, typeof(x));




console.log("\nNull\n");
let m = null;
console.log(m, typeof(m));

console.log("````````````````")

console.log("\nBigInt\n");
const n = BigInt("1343");
console.log(n, typeof(n));


console.log("\nSymbol\n");
let q = Symbol("akshay");
console.log(q, typeof(q));

//Non primitive Data type
//Objects (Array, Functions) 
console.log("\nObject\n");
const obj = {
    name: "Akshay", 
    age: 34,
    marks:234,
    "pass": true
};

console.log(obj, typeof(obj));
console.log(obj.name);
console.log(obj.pass);
console.log(obj["age"]);

obj["age"] = obj["age"] + 1 ;
console.log(obj["age"]);
console.log(obj);

let fname = "Akshay";
fname = "Ashlesh";
console.log(fname);


const product = {
    name: "Parker Jotter standard CT Ball Pen (Black)",
    rating:4,
    Deal_of_day:true,
    offer:5,
    mrp: 270
};

console.log(product);
console.log(typeof(product));

const profile = {
    name : "Akshay",
    followed: false,
    posts:195,
    follwers: "569K",
    following: 4,
    work: "Entrepreneur",
    bio: "Apna College",
};

console.log(profile) ;

console.log(typeof profile["bio"]);

//comments

/* How are you
man of the match 
I think feel better*/


// boiler plate code

