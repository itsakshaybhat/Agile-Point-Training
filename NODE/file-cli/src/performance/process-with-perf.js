import { performance } from 'perf_hooks';
import fs from 'node:fs';
import { WorkerTransform } from '../work-transforms/workerTransform.js';

const start = performance.now();

const read = fs.createReadStream('./data/large.txt');
const write = fs.createWriteStream('./data/output.txt');

read
.pipe(new WorkerTransform())
.pipe(write)
.on("finish",()=>{
    const end = performance.now();
    console.log("Pipeline completed");
    console.log("Total time:", (end-start).toFixed(2),"ms");
});