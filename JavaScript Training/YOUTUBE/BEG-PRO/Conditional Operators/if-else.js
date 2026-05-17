let mode = "dark";
let color;

if ( mode === "dark"){
    color = "black";
} else {
    color = "white";
}
console.log(color);

let age = 25;
if (age = 18){
    console.log("vote");
}else {
    console.log("not vote");
}

let num = 2 ;
if ( num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}


// const num = prompt("Enter a number");
// if (num%5 === 0){
//     console.log(`The entered number ${num} is multiple of 5`);
// } else {
//     console.log("the number is not multiple of 5");
// }

//Wrong way of doing the logic 
// let score = 55;
// if(score > 100){
//     return;
// }
// if ( score >= 90 ) {
//     console.log("A");
// } else if(89 >= score >=70 ) {
//     console.log("B");
// } else if(69 >= score >= 60) {
//     console.log("C");
// } else if(59 >= score >= 50) {
//     console.log("D");
// } else if (0 >= score <= 49) {
//     console.log("F");
// } else {
//     console.log("The student don't get any marks");
// }



let scr = 89;
if ( scr > 100 ){
    return ;
}

if ( scr >= 90) {
    console.log("A ");
} else if (scr<=89 && scr >=80){
    console.log("B");
} else if ( scr <=79 &scr >=70) {
    console.log("C");
} else if ( scr <=69 &scr >=60) {
    console.log("C");
} else if ( scr <=59 &scr >=50) {
    console.log("C");
} else {
    console.log("The marks is lesser than 49!!!!!!!!");
}
