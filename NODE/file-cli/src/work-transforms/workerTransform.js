import { Transform } from 'stream';
import { Worker } from 'worker_threads';

export class WorkerTransform extends Transform {
    constructor(){
        super();
        this.worker = new Worker(new URL("../workers/worker.js",import.meta.url));
    }
    _transform(chunk,encoding,callback){
        const data = chunk.toString();
        this.worker.once('message',(result)=>{
            this.push(result+'\n');
            callback();
        })
        this.worker.postMessage(data);
    }

    _flush(callback){
        this.worker.terminate();
        callback();
    }
}