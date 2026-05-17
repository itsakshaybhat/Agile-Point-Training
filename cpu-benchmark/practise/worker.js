const { parentPort } = require('worker_threads');

const {heavyComputation} = require('./task.js');

parentPort.on("message", (size) => {
    const result  = heavyComputation(size);
    parentPort.postMessage(result);
})