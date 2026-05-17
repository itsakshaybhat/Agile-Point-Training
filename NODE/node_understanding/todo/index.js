const http = require('node:http');

const {handleRequest} = require('./handle');
const port = 3000;

const server = http.createServer(handleRequest);

server.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
})