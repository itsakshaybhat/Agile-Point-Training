// const http = require('http');

// const server = http.createServer((req,res) => {
//     if(req.url === '/') {
//         res.write('Hello World');
//         res.end();
//     }

//     if(req.url === '/api/courses'){
//         res.write(JSON.stringify([1,2,3,4]));
//         res.end();
//     }
// });
// server.listen(3000);

// console.log('Listening on port 3000...');


// const http = require('http');

// const server = http.createServer((req, res)=> {
//     if(req.url === '/favicon.ico') {
//         return res.end();
//     }
//     console.log(`${req.method} : ${req.url}`);
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end("hello , NODE JS HTTP");
// })

// server.listen(9999, ()=> console.log("The server started at 9999"));


const https = require('http');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
};


https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello HTTP');
}).listen(443, ()=>console.log('HTTP server runnign at 443'));

