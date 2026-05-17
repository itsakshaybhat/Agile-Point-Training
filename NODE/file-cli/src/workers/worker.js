import { parentPort } from 'worker_threads';

parentPort.on('message',(data)=>{
    const result = data.toUpperCase();
    parentPort.postMessage(result);
    process.exit();
});

