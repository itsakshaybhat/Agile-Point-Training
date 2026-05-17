// let even = [];
// const collEven = (arr) => {
//     for (let i=0; i<arr.length; i++){
//         if(arr[i]%2===0){
//             even.push(arr[i]);
//         }
//     }
//     console.log(even);
//     return even;
// }
// const val = collEven([1,2,3,4,5,6,7,8,21,23,4,3]);

// console.log(Math.max(...val));


const larget = (arr) => Math.max(...arr.filter(num => num % 2 === 0  ));
console.log(larget([3,45,6,7,4,3,5,67,8,4,,35,98]));