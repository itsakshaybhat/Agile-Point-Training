const student = {
    fullName : "akshay",
    marks : 97,
    printMarks: function() {
        console.log("Marks =", this.marks);
    },
};

// // console.log([] instanceof Array);
// // console.log([] instanceof Object);
// // console.log(new Date() instanceof Date);


// console.log({} instanceof Object);

// const obj = {name: "akshay"};//true
// console.log("name" in obj);//true
// console.log("toString" in obj);//true

// console.log(NaN === NaN); //false

// const [a,b] = [10,20];
// console.log(a  , b);

// const [first,third] = [1,2,3];
// console.log(first, third);

// const person = {name: "Akshay", age: 25, city: "Bengaluru"};
// const {name, age } = person;
// console.log(name, age);
// const {name: fullName} = person;
// console.log(name);
// console.log(person);

// const {city = "Hydrabad"} = person;
// console.log(city);

// function greet({name, age = 18 }) {
//     console.log(`Hello ${name}, you are ${age}`);
// }
// let x = "dkdj";
// greet({ name: "dkdj" });


// function* gen() {
//     yield 1;
//     yield* [2,3];
//     yield 4;
// }

// const g = gen();

// console.log(g.next().value); // 1
// console.log(g.next().value); // 2
// console.log(g.next().value); // 3
// console.log(g.next().value); // 4
// console.log(g.next().value); // undefined

// let magic = [2,3,5,6,7,8,9,10];
// console.log(...magic,11,23);


class User {
    constructor(name) {
        this.name = name ;
    }
}

const admin = class {
    constructor(name) {
        this.name = name ;
    }
}
const akshay = new User() ;


class Player{
    score = 0;
    status = "Active";
    constructor(username){
        this.username = username;
    }
    levelUp() {
        this.score = this.score + 100;
        console.log(`${this.score} is the extraordinary score of the Sir ${this.username}`);
}
}


const p1 = new Player("Akshay") ;
p1.levelUp();
console.log(p1.status);
console.log(p1.score);


class MathHelper{
    static PI = 3.14159;
    static add(a, b){
        return a +b ;
    }
}

// const helper = new MathHelper();
// console.log(helper.add(5,10));

console.log(MathHelper.PI);
console.log(MathHelper.add(5,10));


//encapsulation

class BankAccount {
    #balance=0 ;
    constructor(owner, initialDeposit){
        this.owner = owner;
        this.#balance = initialDeposit;
    }
    deposit(amount) {
        this.#balance = amount + this.#balance;
        console.log(`Deposited ${amount}`);
    }
    getBalance() {
        return `Balance for ${this.owner} is Rs. ${this.#balance}`;

    }

}

const myAcnt = new BankAccount("Akshay", 5000);
myAcnt.deposit(1000);
console.log(myAcnt.getBalance());

//inheritance
class Animal{
    constructor(name) {
        this.name = name;
    }
    makeSound(){
        console.log("Generic animal noise");
    }
}
class Dog extends Animal{
    constructor(name, breed){
        super(name);
        this.breed = breed;
    }
    makeSound() {
        console.log(`${this.name} barks!!`);
    }
}

const myDog = new Dog("Chinti", "Golden Retriever");
myDog.makeSound();
console.log(myDog.name);
console.log(myDog.breed);

class Printer{
    print(){
        console.log(this);
    }
}
const m = new Printer();
m.print();
const standalonePrint = m.print;
standalonePrint();

//getters, setters, generators

class Rectangle{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
    get area(){
        return this.height * this.width;
    }
    set area(value){
        console.log(`Sorry, you can't set area to ${value}. Change the height/width instead`);
    }
    *getSides(){
        yield this.height;
        yield this.width;
        yield this.height;
        yield this.width;
    }
}

const square = new Rectangle(10,10);
console.log(square.area);
square.area = 500;
console.log([...square.getSides()]);


// class Rectangle1 {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }

//   get area() {
//     return this.height * this.width;
//   }

//   set area(value) {
//     // assume square for simplicity → update both sides
//     this.height = Math.sqrt(value);
//     this.width = Math.sqrt(value);
//   }

//   *getSides() {
//     yield this.height;
//     yield this.width;
//     yield this.height;
//     yield this.width;
//   }
// }

// const square = new Rectangle1(10, 10);

// console.log(square.area); // 100

// square.area = 400; // setter updates height & width

// console.log(square.height); // 20
// console.log(square.width);  // 20
// console.log(square.area);   // 400

// console.log([...square.getSides()]); // [20, 20, 20, 20]


class Data{
    static connStatus = "disconnected";
    static config;
    static {
        try{
            this.config = {port: 8080, secure: true};
            this.connStatus = "ready";
        } catch(e) {
            this.connStatus = "failed";
        }
    }
}
console.log(Data.connStatus);
console.log(Data.config.port);

class akshay1 {
    constructor(name){
        this.name = name;
    }
    rollno(name){
        console.log(name);
        console.log(this.name);
    }
}
const ak = new akshay1("ramachandra");
ak.rollno("akshay");

class DataFetcher{
    constructor(url){
        this.url = url;
    }
async fetchUserData() {
    const response = await fetch(this.url);
    const data = await response.json();;
    return data;
}
}