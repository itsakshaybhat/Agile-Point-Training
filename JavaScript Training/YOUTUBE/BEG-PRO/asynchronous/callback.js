// console.log(1);
// console.log(2);
// setTimeout(()=>{
//     console.log("Ok Now the time completes");
// },2000);
// console.log(3);
// console.log(4);
// console.log(5);

// callbacks


// function sum(a,b){
//     console.log(a+b);
// }
// function calculator(a,b,sumCallback){
//     sumCallback(a,b)
// }
// calculator(20,53,sum);

const hello = () => {
    console.log("hello");
}

setTimeout(hello, 2000);