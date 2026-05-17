import fs from 'node:fs';

const readStream = fs.createReadStream('./data/large.txt');
const writeStream = fs.createWriteStream('./data/manual-copy.txt');

readStream.on('data',(chunk)=>{
    const canContinue = writeStream.write(chunk);
    if(!canContinue){
        readStream.pause();
    }
});


writeStream.on('drain',()=>{
    readStream.resume();
})

readStream.on('end',()=>{
    writeStream.end();
})

readStream.on('error', (err) => {
  console.error('Read error:', err);
});

writeStream.on('error', (err) => {
  console.error('Write error:', err);
});
