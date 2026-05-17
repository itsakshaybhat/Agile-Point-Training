//mainly for objects

// let student = {
//     name : "Kumar",
//     age: 20,
//     cgpa: 24.2,
//     isPass: true,
// };


// for (let i in student){
//     console.log(i, student[i]) //Keys and values [] used to get the value
// }




let gameNum = 25;
let userNum = prompt("Guess the game number");
while(userNum != gameNum) {
    userNum = prompt("You have enter the wrong number, guess again");
}
console.log("You entered the right number");