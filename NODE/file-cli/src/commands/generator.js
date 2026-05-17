import fs from 'node:fs';

const file = fs.createWriteStream('./data/large.txt');

let i = 0;
const max = 1e3;

function write() {
    let ok = true;
    while (i < max && ok){
        const data = `${Date.now()} - Line ${i}\n`;
        ok = file.write(data);
        i++;
    }
    if(i<max){
        file.once("drain",write);
    } else {
        file.end();
    }
}

write();
