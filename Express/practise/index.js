const http = require('node:http');
const {requestHandler} = require('./handler.js');

const port = 1090;

const server = http.createServer(requestHandler);

server.listen(port, ()=> console.log(`Server Started at http://localhost:1090`));
