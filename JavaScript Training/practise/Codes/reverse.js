function reverse(n){
    const isNegative = n < 0;
    if (!isNegative) {
        const reversed = parseInt(String(Math.abs(n)).split("").reverse().join(""),10);
        return reversed;
    }
    return -reversed;
}

console.log(reverse(456));
