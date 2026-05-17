const alphabeticOrder = (str) => {
    return str.split("").sort((a,b) => a > b ? 1 : -1).join("");
}


console.log(alphabeticOrder("Akshay"));

str = "amarnath";
console.log(str.split('').sort().join(''));