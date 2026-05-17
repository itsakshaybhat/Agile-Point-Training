// // const replacing = (str) => {
// //     return str
// //         .split("")
// //         .map(char => String.fromCharCode(char.charCodeAt(0) + 1))
// //         .join("");
// // }


// // let str = "Akshay";
// // console.log(replacing(str));


// //String.fromCharCode
// //charCodeAt


// const moveChar = (str) => {
//     return str
//     .split('')
//     .map(char => String.fromCharCode(char.charCodeAt(0) + 1))
//     .join('');
// }

// console.log(moveChar("akshay"));


const movingChary = (str) => {
    return str 
        .split('')
        .map(char => String.fromCharCode(char.charCodeAt(0) + 1 ))
        .join('');
}
console.log(movingChary("z"));


let chary = 'a';
console.log(chary.charCodeAt(0)+1);