//Access element

let heading = document.getElementById("heading"); //h1 value retuurn
console.dir(heading);

let headings = document.getElementsByClassName("heading-class");
console.dir(headings);
console.log(headings);


let paras = document.getElementsByTagName("p");
console.log(paras);
console.dir(paras);

let first = document.querySelector("p");
console.dir(first);
let elements_all = document.querySelectorAll("p");//all elements
console.dir(elements_all);
let elements2 = document.querySelector(".heading-class");
console.dir(elements2);
let elements3 = document.querySelectorAll(".heading-class");
console.dir(elements3);
let elements4 = document.querySelectorAll("#myId");
console.dir(elements4);


//properties

// Get or Update

// tagName: return the tag name
//innerText: return the text content of the element and all its children  
// DOM, first Child , last child, div child, parent, children, text, comment, element,navigation, 

//innerHTML: return the plain text or HTML contents in the element.

let div = document.querySelector("div");
console.log(div);

// div.innerHTML = "<div>Inner div</div>"

//textualcontent: returns textual content even for hidden eleemnts



let hello_JS = document.querySelector("#hello");

console.log(hello_JS.innerText)

hello_JS.innerText = hello_JS.innerText + " from Apna College students";


let divs = document.querySelectorAll(".box");
// console.log(divs[0]);
// console.log(divs[1]);
// console.log(divs[2]);
let value = 1 ;
for(div of divs){
    div.innerText= `new unique value ${value}`;
    value++;
}
// divs[0].innerText = "new unique value 1";
// divs[1].innerText = "new unique value 2";
// divs[2].innerText = "new unique value 3";
