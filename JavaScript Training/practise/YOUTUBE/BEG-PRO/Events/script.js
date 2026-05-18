let btn1 = document.querySelector("#btn1");

const handler3 = () => {
    console.log("button1 was clicked - 2");
}

btn1.addEventListener("click", (evt) => {
    console.log("button1 was clicked - 1 ");
    // console.log(evt.target);
}) 

btn1.addEventListener("click", handler3) ;


btn1.addEventListener("click", () => {
    console.log("button1 was clicked - 2");
}) 

btn1.addEventListener("click", () => {
    console.log("button1 was clicked - 4");
}) 

btn1.removeEventListener("click",handler3);