import cluster from 'cluster';
import os from 'node:os';

const numCPUs = os.cpus().length;
if(cluster.isPrimary){
    console.log(`Master process ${process.pid}`);
    for(let i =0 ; i< numCPUs; i++){
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
        });
} else {
    console.log(`Worker process ${process.pid} started`);
    setInterval(()=>{
        console.log(`Worker ${process.pid} processing`);
    },2000);
}