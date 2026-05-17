const obj1 = {name: "Akshay"};
const obj2 = {name: "Shashankk"};
function getThis(){
    return this.name;
}
obj2.fantastic = getThis;
console.log(obj2.fantastic());



const myObject = {
    name: "My OBject",
    normalMethod() {
        const arrow =() => {
            console.log(this.name);
        }
    return arrow;
    }
}
// myObject.normalMethod.arrow;
const stolenArrow = myObject.normalMethod();
stolenArrow();


const myObject1 = {
  name: "My Object",
  normalMethod() {
    this.arrow = () => {
      console.log(this.name);
    };
  }
};

myObject1.normalMethod();
myObject1.arrow(); // now works


// call, apply, bind 

// call(thisArg, arg1, arg2);
// apply(thiArg, [arg1, arg2]);
// bind(thisArg);

function greet(city, country) {
    console.log(`Hello ${this.name} from ${city} , ${country}`);
}
const user = { name : "Akshay"};
greet.call(user,"Bengaluru", "India");
greet.apply(user, ["Bengaluru", "India"]);
const boundGreet = greet.bind(user, "Bengaluru", "India");
boundGreet();


function vkit(clg){
    console.log(`${this.name}'s college name is ${clg}`);
}

const person = {name:"Akshay"};
vkit.call(person,"VKIT");
vkit.call(person,"BOSCO");
vkit.apply(person, ["SJB"]);
vkit.apply(person, ["sjb"]);

const binding = vkit.bind(person,"MIT");
binding();


class player{
    constructor(name){
        this.name = name;
    }
}
const p1 = new player("akshay");
console.log(p1);

class poison{
    constructor(name){
        this.name = name;
    }
    value(){
        return this.name;
    }
}

const val = new poison("Jai Anjaneya");
console.log(val.value());

// const btn = document.querySelector("button");
// btn.addEventListener("click",function() {
//     this.style.backgroundColor = "blue";
// });

// const object = {a:10};
// with(obj) {
//     console.log(a);
// }

function normalcons() {
    this.a = 38;
}
const obj3 = new normalcons();
console.log(obj3.a);


const data = {name: "test" , value : 10};
JSON.stringify(data, function replacer(key, value) {
    console.log(this === data); //true
    return value;
})

class Parent {
    checkThis() {
        return this;
    }
}
class Child extends Parent {
    test() {
        const result = super.checkThis();
        console.log(result === this); //true
    }
}
const c = new Child();
c.test();



class SmartCar {
  get honk() {
    // It only creates the bound function if someone actually tries to use it
    const boundFunction = function() {
      console.log("Beep!");
    }.bind(this);
    
    // It then overwrites the getter with the bound function to save it
    Object.defineProperty(this, 'honk', {
      value: boundFunction
    });
    
    return boundFunction;
  }
}

{/* <button onclick = "alert(this.tagName)">Show This</button> */}
class Server {
  static activeConnections = 5;
}
console.log(Server.activeConnections);