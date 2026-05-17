let newbtn = document.createElement("button");
newbtn.innerText = "Click Me";
let body = document.querySelector("body");
newbtn.style.backgroundColor = "red";
newbtn.style.color = "white";

body.prepend(newbtn);

let para = document.querySelector("p");
para.classList.add("newClass");