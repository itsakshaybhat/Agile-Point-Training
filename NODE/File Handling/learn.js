const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = 8080;

const myServer = http.createServer((req,res)=>{
    const filePath = fs.path(__dirname, 'public', 'index.html');
    fs.readFile(filePath,(err,data) => {
        if(err) {
            res.writeHead(500);
            res.end('Server failed in the read file');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    })
})

myServer.listen(port,()=> console.log("Server Started at", port));