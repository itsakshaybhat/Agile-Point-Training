function transformToObjects(numberArray) {
    // Todo: Add your logic
    // should return an array of objects
    let arr = numberArray.map((value)=>({val: value}));
    return arr;
}

const array = [1,2,3];
console.log(transformToObjects(array))