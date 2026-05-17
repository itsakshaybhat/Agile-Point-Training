// const evenArray = (arr) => {
//     let count = 0;
//     for (let i of arr) {
//         if (i%2===0){
//             count++;
//         }
//     }
//     return count;
// }

// console.log(evenArray([1,2,3,4,5,5,6,7,8,8,9,101]));

const countEvenNumbers = (arr) => {
    return arr.filter(val => val%2 === 0).length;
}

console.log(countEvenNumbers([1,2,3,4,5,5,6,7,8,8,9,101]));