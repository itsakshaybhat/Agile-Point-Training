const btn1 = document.querySelector("#btn1");
// btn1.onclick = () => {
//     console.log("btn1 was clicked");
//     let a = 25;
//     a ++;
//     console.log(a);
// }

const div = document.querySelector("div");
div.onmouseover = () => {
    console.log("okay the button was clicked");
    div.style.backgroundColor = "red";
}

btn1.onclick = (e) => {
    console.log(e);
    console.log(e.type);
    console.dir(e.type);
    console.dir(e.clientX);
    console.dir(e.clientY);
}