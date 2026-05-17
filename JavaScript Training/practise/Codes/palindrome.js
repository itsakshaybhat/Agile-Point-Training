function palind(n) {
    const str = String(Math.abs(n));
    return str === str.split("").reverse().join("");
}

console.log(palind(5));
