import {Worker} from 'worker_threads';

const worker = new Worker(new URL('./worker.js', import.meta.url));
console.log( import.meta.url)
worker.postMessage("hello from main thread");

worker.on('message',(msg)=>{
    console.log('From worker:', msg);
})