function find(arr){
    let max = arr[0];
    for (let i=0; i<arr.length; i++){
        if( arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}


console.log(find([3,45,53,45,345,3,4,5,]));