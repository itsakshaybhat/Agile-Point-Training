const http = require('http');
const fs = require('fs');
const url = require('url');


const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()} : ${req.url} and their request is : ${req.method} New Request Recieved\n`;
    const myURL = url.parse(req.url, true);
    fs.appendFile("./log.txt",log, (err, data) =>{
        switch(myURL.pathname) {
            case '/': 
            if(req.method === 'GET'){
                res.end("Home Page");
            }
            break;
            case '/signup':
            if(req.method === 'GET') res.end("This is signup form");
            else if( req.method === 'POST') {
                //DB query
                res.end("Suceess");
            }
            break;
    
            case '/about':
            const username = myURL.query.myname;
            res.end(`hi, ${username}`);
            break;

            default:
                res.end('404 Not found');
        }
    });
});

myServer.listen(8000, () =>{
    console.log("The server Started at the port of 8000");
});