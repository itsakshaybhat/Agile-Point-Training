const fs = require('node:fs');
const path = require('node:path');

const file = fs.createWriteStream(path.join(__dirname, '..', 'data', 'bigfile.txt')); // Writes the content in the form of chunks.

for (let i =0 ; i< 1e3; i++){
    file.write(`This is line number${i}\n`);
}

file.end();