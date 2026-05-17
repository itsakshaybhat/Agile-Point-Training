const {createServer} = require('node:http');
const hostname= '127.0.0.1';
const port = 3000;

// 80 default http 
// 402 default https 
// 3306 sql database 
// 5500 local dev server 

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello world");
});
server.listen(port, hostname, () => {
    console.log("Server is running at http: port number is 3000");
})


// import { createServer } from 'node:http';
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });