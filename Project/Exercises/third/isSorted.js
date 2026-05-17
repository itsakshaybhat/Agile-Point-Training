// function isSortedAsc(arr) {
//     let isSorted = false;
//     for(let i of arr){
//         if (i > i+1){
//             isSorted = isSorted && isSorted;
//             return isSorted;
//         }
//     }
//     return !isSorted;
// }

// console.log(isSortedAsc([2,1,37]));

const isAscending = (arr) => {
    for (let i=0;i<arr.length;i++) {
        if(arr[i+1]<arr[i]) return false;
    }
    return true;
}

console.log(isAscending([8,88]));