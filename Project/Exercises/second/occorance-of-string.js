// const containChar = (str, char) => {
//     let count = 0;
//     for(let each of str) {
//         if (each === char) {
//             count +=1 ;
//         }
//     }
//     if(count>=2 && count<=4){
//         return `Occoured more than 3 times and its count is ${count}`;
//     }
//     return false;
// }

// console.log(containChar("aaaaa", "a"));



const countChars = (str, char) => 
    str.split('').filter(ch=> ch === char).length;

const contains2to4 = (str, char) => 
    countChars(str, char) >= 2 && countChars(str, char) <= 4;

console.log(contains2to4("oooh", "o"));