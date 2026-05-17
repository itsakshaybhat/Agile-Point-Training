// const http = require('node:http');
// const fs = require('node:fs');
// const path = require('node:path');



// const port = 8080;
// const server = http.createServer((req, res) => {
//     if (req.url === '/' && req.method=== 'GET'){
//         const filePath = path.join(__dirname, 'public','index.html');
//         fs.readFile(filePath, (err,data) =>{
//             if(err) {
//                 res.writeHead(500);
//                 res.end('Server Error');
//             } else {
//                 res.writeHead(200, {'Content-Type': 'text/html'});
//                 res.end(data);
//             }
//         });
        
//     } else {
//         res.writeHead(404);
//         res.end('Page Not Found');
//     }
// });

// server.listen(port, ()=> console.log(`Server Started at ${port}`));


// const http = require('node:http');
// const fs = require('node:fs');
// const path = require('node:path');

// const port = 8080;

// const myServer = http.createServer((req, res) => {
//     if(req.url === '/' && req.method === 'GET'){
//         const filePath = path.join(__dirname, 'public', 'index.html');
//         fs.readFile(filePath, (err, data) => {
//             if(err) {
//                 res.writeHead(500);
//                 res.end('Server Error');
//             } else {
//                 res.writeHead(200, {'Content-Type':'text/html'});
//                 res.end(data);
//             }
//         })
//     }
// })

// myServer.listen(port, ()=> console.log("Server Started at port", port));



const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = 8080;

const myServer = http.createServer((req,res)=>{
    if(req.url === '/' && req.method==='GET'){
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath,(err,data) => {
        if(err) {
            res.writeHead(500);
            res.end('Server failed in the read file');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    })} else{
        res.writeHead(404);
        res.end('Server not found');
    }
})

myServer.listen(port,()=> console.log("Server Started at", port));