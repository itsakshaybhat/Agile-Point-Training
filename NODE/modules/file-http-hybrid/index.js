const http = require('http');
const fs = require('fs');

const port = 5000;

const server = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();

    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = myUrl.pathname;
    const query = Object.fromEntries(myUrl.searchParams);

    const userAgent = req.headers['user-agent'];
    const ip = req.socket.remoteAddress;

    const log = `${new Date().toISOString()} | ${req.method} -> ${req.url} | ${userAgent} | ${ip}\n`; // I don't know how to   do the user agent that means the browser info, and IP address.

    fs.appendFile("logger.txt", log, (err) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error logging request');
        }
    });

    
    if(req.url === '/'){
        fs.readFile('logger.txt', 'utf-8', (err, data) => {
            if(err) {
                res.statusCode = 500;
                return res.end("Error reading file");
            }
            res.setHeader('Content-Type','text/html');
            res.end(data);
        })
    } else if (req.url === '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>This is About Page</h1>`);
        
    } else if (req.url === '/logs') {
        const stream = fs.createReadStream('logger.txt');
        res.setHeader('Content-Type', 'text/plain');
        stream.pipe(res);
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});
    

server.listen(port, ()=> console.log(`The server has been started at the port of ${port}`));