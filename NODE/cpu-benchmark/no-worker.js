const {heavyComputation} = require('./task');

const start = Date.now();

console.log("Starting without Worker");

for(let i = 0; i< 4; i++){
    heavyComputation(5e7);
}

const end = Date.now();

console.log("Time takkken (no worker)", end - start);