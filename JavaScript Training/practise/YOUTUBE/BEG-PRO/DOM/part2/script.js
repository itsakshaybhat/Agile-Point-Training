// // //getAttribute:
// // let div = document.querySelector("div");
// // console.log(div);

// // let id = div.getAttribute("id");
// // console.log(id);

// // let name = div.getAttribute("name");
// // console.log(name);

// // let para = document.querySelector("p");
// // console.log(para);

// // console.log(para.getAttribute("class"));


// // //SetAttribute

// // let change = document.querySelector("p");
// // console.log(change.setAttribute("class", "monkey"));

// // let division = document.querySelector("div");
// // console.log(division.style);

// // division.style.backgroudColor= "green";
// // division.style.backgroudColor= "purple";


// // division.style.fontSize = "26px";
// // division.innerText = "Hello";


// let newBtn = document.createElement("button");
// newBtn.innerText = "Click Me";
// console.log(newBtn);

// let div = document.querySelector("div");
// // div.append(newBtn); //adding the element at the end of the node (inside)

// // div.prepend(newBtn); //adding the element (button) at the start of the node (inside) 

// // div.before(newBtn); //adds before the node outside teh node

// // div.after(newBtn);//adds the element after the node


// let orgasm = document.createElement("h1");
// orgasm.innerHTML ="<i>Hi I am new Beginner</i>";
// document.querySelector("body").prepend(orgasm);

// let para = document.querySelector("p");
// para.remove();
// orgasm.remove();


// // mdn go and read, appendchild and removechild













let newBtn = document.createElement("button");
newBtn.innerText = "Click Me";
newBtn.style.backgroundColor = "red";
newBtn.style.color= "white";
console.log(newBtn);

document.querySelector("body").prepend(newBtn);