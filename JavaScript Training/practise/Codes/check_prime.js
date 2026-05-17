function isPrime(n) {
    if (n < 2) {
        return false;
    }
    for (let i = 2 ; i<=Math.sqrt(n);i++){
        if (n % i === 0 ) {
            return false;
        }
    }
    return True
}

console.log(isPrime(39457982347587324));