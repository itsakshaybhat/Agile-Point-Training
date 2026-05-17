const nearest100 = (num1, num2) => {
//     let n1 = 100 - num1;
//     let n2 = 100 - num2;
//     if (n1 > n2) {
//         return `The value closest to the 100 is ${num2}`;
//     } else {
//         return `The value closest to the 100 is ${num1}`;
//     }
    return (100 - num1) < (100-num2) ? num1 : num2 ;
}

console.log(nearest100(1,1.2));