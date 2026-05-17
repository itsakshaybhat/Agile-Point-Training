const btnA = document.querySelector("#button_A");
const headingA = document.querySelector("#heading_A");
let count = 1 ;
btnA.onclick =()=>{
    btnA.innerHTML = "Try Again";
    headingA.textContent = `${count} clicks so far `;
    count += 1 ;
    if (count > 5) {
        headingA.textContent = "The maximim trial is reached";
        btnA.disabled = true ;
        return;
    }
    
};
