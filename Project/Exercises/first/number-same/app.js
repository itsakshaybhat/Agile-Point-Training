const check = (a, b) => {
    if(a === 100 || b === 100 || (a+b) === 100){
        return true;
    }
    return false;
}


console.log(check(100, 20));
console.log(check(100, 100));
console.log(check(50, 20));
console.log(check(50, 50));