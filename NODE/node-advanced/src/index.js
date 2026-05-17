const fs = require('node:fs');
const path = require('node:path');

const inputPath = path.join(__dirname,'data','bigfile.txt');
const outputPath = path.join(__dirname, 'data', 'output.txt');

const readStream = fs.createReadStream(inputPath,{
    highWaterMark: 6 * 1024 //64 KB
});

let totalBytes = 0;
let count  = 0
let cnk = 0;
const writeStream = fs.createWriteStream(outputPath);

readStream.pipe(writeStream,cnk++);
console.log(`The number of chunks written is ${cnk}`);
writeStream.on('finish',()=>{
    console.log('File copied successfully');
})

readStream.on('data',(chunk)=>{
    totalBytes += chunk.length;
    count += 1;
    console.log('Reading chunk:', chunk.length);
})

readStream.on('end',()=>{
    console.log('Finished reading');
    console.log('Total MB:', (totalBytes / (1024*1024)).toFixed(2));   
    console.log(`Total chunks: ${count}`);
    console.log(`Average chunk size: ${Number(totalBytes/count)}`);

})

readStream.on('error',(err)=>{
    console.error('Read Error', err.message);
})

writeStream.on('error',(err)=>{
    console.error('Write Error', err.message);
})

