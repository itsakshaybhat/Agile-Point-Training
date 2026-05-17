const http = require('node:http');

const PORT = 3000;

const {handleRequest} = require('./handler.js');

const server = http.createServer(handleRequest);

server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});



