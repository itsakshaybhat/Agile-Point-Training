function isArm(n) {
    const digits = String(n).split("");
    // console.log(digits);
    const power = digits.length;
    const sum = digits.reduce((acc, d) =>acc + Math.pow(Number(d),power),0);
    return sum === n;
}

console.log(isArm(153));
console.log(isArm(93475));
console.log(isArm(974));