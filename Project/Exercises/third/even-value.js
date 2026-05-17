// const evenTillDigit = (digit) => {
//     let count = 0;
//     for (let i = 1; i<digit; i++){
//         if (i %2  === 0) {
//             count++;
//         }
//     }
//     return count;
// }

// console.log(evenTillDigit(5));


const countEven = (arr) => {
    return arr.filter(num => num % 2 === 0 ).length;
}

const createArray = (num) => {
    const returnArray = [];
    for ( let i = 1; i <= num ; i++) {
        returnArray.push(i);
    }
    return returnArray;
}

console.log(countEven(createArray(6)));