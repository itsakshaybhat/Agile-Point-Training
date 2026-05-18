class Person{
    constructor(){
        console.log("Enterd parent");
        this.species = "homo sapiens";
        this.branch = branch;
    }
    eat(){
        console.log("eat");
    }
}

class Engineer extends Person{
    constructor(branch) {
        console.log("Entered child");
        super(branch);
        this.branch = branch;
        console.log("Exit child");
    }
    work(){
        console.log("Solve the problems");
    }
}


let akshay = new Engineer("Chemical");

console.log(akshay.branch);