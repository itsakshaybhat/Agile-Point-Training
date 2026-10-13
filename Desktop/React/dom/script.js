const container = document.querySelector("#container");

const content = document.createElement("div");

content.classList.add("content");
content.textContent = "Hi there how are you";
container.appendChild(content);

const redWord = document.createElement("p");

redWord.textContent = "Hey there, I am red in color";
redWord.style.color = "red";

container.appendChild(redWord);

// an <h3> with blue text that says “I’m a blue h3!”

const blueText = document.createElement("h3");

blueText.classList.add("blueText");
blueText.textContent = "I'm a blue h3";
blueText.style.color = "blue";

container.appendChild(blueText);

// a <div> with a black border and pink background color with the following elements inside of it:
// another <h1> that says “I’m in a div”
// a <p> that says “ME TOO!”
// Hint for this one: after creating the <div> with createElement, append the <h1> and <p> to it before adding it to the container.

const borderArea = document.createElement("div");
borderArea.style.backgroundColor = "pink";
borderArea.style.border = "1px solid black";

const childH1 = document.createElement("h1");
childH1.classList.add("child1");
childH1.textContent = "I am in a div";
borderArea.appendChild(childH1);

const para = document.createElement("p");
para.classList.add("claasPara");
para.textContent = "Me Too";

borderArea.appendChild(para);

container.appendChild(borderArea);

//Button onclick action

const buttonClick = document.querySelector("#click");
buttonClick.textContent = "Click nah";
buttonClick.onclick = () => alert("hello world");

const btnElement = document.createElement("button");
btnElement.textContent = "Click it";
btnElement.onclick = () => {
  btnElement.textContent = "You clicked the button";
};

container.appendChild(btnElement);

const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  alert("You clicked on me");
});

function onclickFunc() {
  alert("hi");
}

const btn1 = document.querySelector("#btn2");
btn1.addEventListener("mouseover", function (e) {
  console.log(e);
});

btn1.addEventListener("mouseover", function (e) {
  e.target.style.background = "blue";
});

btn1.addEventListener("mouseover", function (e) {
  e.target.style.color = "white";
});

btn1.addEventListener("mouseout", function (e) {
  e.target.style.color = "black";
});

const storage = document.querySelectorAll("#storage");

storage.forEach((button) => {
  button.addEventListener("click", () => {
    alert(button.id);
  });
});
