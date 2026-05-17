// class MyClass {
//     constructor(){

//     }
//     myMethod;
// }

// let obj = new MyClass();


class ToyotaCar{
    constructor(brand , mileage){
        console.log("Creating the new object");
        this.brand  = brand;
        this.mielage = mileage;
    }
    start(){
        console.log("start");
    }
    stop(){
        console.log("stop");
    }
    setBrand(brand){
        this.brandName = brand;
    }
}

let obj = new ToyotaCar("HI",10);
let lexus = new ToyotaCar("hello",20);
// obj.setBrand("iphone");
// lexus.setBrand("microsoft");

