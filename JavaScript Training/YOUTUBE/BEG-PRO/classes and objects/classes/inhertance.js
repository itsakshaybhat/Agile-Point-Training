class Person{
    constructor(){
        this.species = "homo sapiens";
    }
    eat(){
        console.log("eat");
    }
    sleep(){
        console.log("sleep");
    }
    work() {
        console.log("do nothing ");
    }
}

class Engineer extends Person{
    work(){
        console.log("Solve the problems");
    }
}

class Doctor extends Person{
    work(){
        console.log("Treat the patients");
    }
}

let akshay = new Engineer();//Over riding

console.log(akshay.species); //Prints
