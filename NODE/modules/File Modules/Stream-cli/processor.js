const fs = require('node:fs');

const readline = require('node:readline');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if ( !inputFile || !outputFile) {
    console.log("Usage: node processor.js <inputFile> <outputFile");
    process.exit(1);
}

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,

})

rl.on('line', (line) => {
    const processed = line.toUpperCase();
    if(!writeStream.write(processed)){
        rl.pause();
        writeStream.once('drain', ()=> {
            rl.resume();
        })
    }
})

rl.on('close', () => {
    console.log('Processing Finished');
    writeStream.end();
})

readStream.on('error', (err) => {
    console.error("Read error", err.message);
})

writeStream.on('error', (err) => {
    console.error("Write error", err.message);
})

