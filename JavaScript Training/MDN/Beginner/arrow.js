(function (a){
    return a + 100;
});

(a)=>{
    return a + 100;
};

(a) => a + 100;

a => a + 100;

const ping = () => "pong";
const add = (a,b) => a + b;
const greet = (name ="greet") => `Hello ${name}`;
const sumAll = (...numbers) => numbers.reduce((a,b)=> a + b);
console.log(sumAll(1,2,3,4,5,6));

const double = x => x * 2;
console.log(double(99));

const complexDouble = (a, b) => {
    const chuck = 42;
    return a +b + chuck ;
}

console.log(complexDouble(10, 30));

const makeUser = () => {name:"Akshay"};
console.log(makeUser());

const makeUserFix = () => ({name: "Akshay"});
console.log(makeUserFix().name);

const obj = {
    i : 10,
    b : ()=> console.log(this.i),
    c() { console.log(this.i)}
}

obj.b();
obj.c();

const good = (...args) => args[0] + 10 ;
console.log(good(1));

const Foo = () => {};
// const myFoo  = new Foo;
console.log("prototype" in Foo) ;

class Car {
    speed =100;
    getSpeed=() =>{
        console.log(this.speed);
    };
}

const func = (a, b) => 1;

let callbacks;
callbacks = callbacks || (()=> {});

const arr = [5,4,23,5];
const even = arr.filter(v => v % 2 == 0);
const double2 = arr.map(v => v * 2);

const timeObj = {
    count : 30,
    start() {
        setTimeout(()=> {
            this.count++;
            console.log(this.count);
        },100);
    }
}
timeObj.start();

const getFirsttwo = ([first, second]) => first +second ;
console.log(getFirsttwo([10,20,30]));

const getAge = ({age}) => age/2;
const user = {name:"akshay", age: 22};
console.log(getAge(user));

const result = (()=>"foobar")();

console.log(result);