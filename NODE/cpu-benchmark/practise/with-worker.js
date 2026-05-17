const { Worker } = require('worker_threads');

const start = Date.now();
console.log("the work has been started");

let completed = 0 ;

for (let i = 0; i  < 4 ; i++) {
    const worker = new Worker('./worker.js');
    worker.postMessage(5e7);

    worker.on("message", ()=>{
        completed++;
    })
    if(completed ===4 ){
        const end = Date.now();
        console.log("total time taken is", end - start);
    }
}