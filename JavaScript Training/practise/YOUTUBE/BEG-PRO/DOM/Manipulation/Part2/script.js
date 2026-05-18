// let newbtn = document.createElement("button");
// newbtn.innerText = "click me";
// console.log(newbtn);


// let div = document.querySelector("p");
// // div.append(newbtn); //at the bottom inside the box
// // div.prepend(newbtn);// at the top inside the box
// // div.before(newbtn); //at the top of the outside box
// div.after(newbtn);

let newHeading = document.createElement("h1");
newHeading.innerHTML = "<i> Hi, I am new heere </i>";
document.querySelector("body").prepend(newHeading);


let para = document.querySelector("p");
para.remove();
// newHeading.remove();