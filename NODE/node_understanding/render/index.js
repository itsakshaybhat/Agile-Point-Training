const http = require('node:http');
const {handleRequest} = require('./handler.js');
const port = 3000;

const server = http.createServer(handleRequest);

server.listen(port, ()=>{
    console.log(`Server Started at http://localhost:${port}`);
})