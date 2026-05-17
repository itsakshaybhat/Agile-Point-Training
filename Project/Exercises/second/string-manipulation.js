const makingNewString = (str) => {
    return str.length < 3 ? str : str.slice(0,3) + str.slice(-3);
}

console.log(makingNewString("manjunath"));
console.log("ok");