addEventListener("message", (message) => {
    if (message.data.command === "generate") {
        generatePrimes(message.data.quota);
    }
})

function generatePrimes(quota){
    function isPrime(n) {
        if (n <= 1) return false;
        if (n === 2) return true;
        for( let c = 2 ; c < Math.sqrt(n); ++c ){
            if ( n % c === 0) return false;
        }
        return true;
    }
    const prime = [] ;
    const maximum = 100000;
    while (prime.length < quota){
        const candidate = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(canditate)){
            prime.push(candidate);
        }
    }
    postMessage(prime.length);
}

const quota = parseInt(document.querySelector("#quota").value, 10);