let divs = document.querySelectorAll(".box");
let idx = 1;
for(let div of divs) {
    div.innerText = `new Unique value akshay's ${idx}`;
    idx++;
}

// divs[0].innerText ="new Unique Value 1"
// divs[1].innerText ="akshay"
// divs[2].innerText ="Manjunath Bhat"
