const fs = require('fs');
const sf = require('fs').promises;

//readFileSync, readFile, fs.promises.readFile()

const data = fs.readFileSync("./text.txt", 'utf-8');
// console.log(data);


fs.readFile("text.txt", 'utf-8', (err, data) => {
    
    if (err) {
        console.log(err);
        return;
    }
    // console.log(data);
    // console.log("Finished");
})


async function readData(){
    try{
        const data = await sf.readFile("text.txt", 'utf-8');
        // console.log(data);
    } catch(e) {
        console.log(e);
    }
}

readData();

fs.readFile('text.txt', 'utf-8', (err, data) => {
    if(err){
        console.err(err);
    }
    // console.log(data);
})

// fs.writeFile("akshay.txt", "hello Akshay __________________:)", (err) =>{
    // if(err) throw err;
    // console.log("fiel created");
// })

// fs.appendFile("agile.txt",'console.log("akshay");',(err) => {
//     if(err) throw err;

// })

// fs.unlink("agile.txt",(err) => {
//     if(err) throw err;
//     console.log("deleted");
// })

// fs.mkdir("myFfirstFS",(err)=> {
//     if(err) throw err;
//     console.log("folderr created");
// })

// fs.mkdir('node/express/api/middleware', {recursive: true}, (err) => {
//     if(err) throw err ;
// })


// fs.rmdir("myFfirstFs", (err)=>{
//     if(err) throw err;
//     console.log('deleted');
// })


// fs.rm('node', {recursive:true, force: true}, (err)=>{
//     if(err) throw err;
// })



// fs.readdir('.', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// });


// fs.stat('text.txt', (err, stats) => {
//     if (err) throw err;
//     console.log(stats.isFile());
//     console.log(stats.size);
//     console.log(stats);
// });

// console.log(fs.constants);

// const readStream = fs.createReadStream('text.txt', 'utf-8');
// readStream.on('data', chunk =>{
//     console.log(chunk);
// })

// const writeStream = fs.createWriteStream('output.txt');
// writeStream.write("hello\n");
// writeStream.write("world\n");
// writeStream.write("Amma\n");



