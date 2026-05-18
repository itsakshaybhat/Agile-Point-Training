let button = document.getElementById("myId");
console.dir(button);

// let headings = document.getElementsByClassName("myClass");
// console.dir(headings);  
// console.log(headings); 

let paras = document.getElementsByTagName("p");
console.dir(paras);

let elements = document.querySelector("p"); //returns 1st element
console.dir(elements) ;

let allEl = document.querySelectorAll("p"); //If we want the all elements
console.dir(allEl);

let firstEl = document.querySelector(".myClass");
console.dir(firstEl);

let before = document.querySelector("#myId");
console.dir(before);

