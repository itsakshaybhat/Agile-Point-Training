const event = new Event("build");
elem.addEventListener("build", (e) => {

})


const even1t = new CustomEvent("build", {detail: Element.dataset.time});

function eventHandler(e) {
    console.log(`The time is : ${e.deatail}`);
}

class BuildEvent extends Event {
    #buildTime;

    constructor(buildTime){
        super("build");
        this.#buildTime = buildTime;
    }
}

const btn = document.querySelector("button");
function greet(event){
    console.log("greet:", event);

}
btn.onclick = greet;

const btn =  document.querySelector("button");
function greet(evnet){
    console.log("greet", evnet);
}

btn.addEventListener("click", greet);