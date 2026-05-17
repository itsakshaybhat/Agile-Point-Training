const http = require('http');
const fs = require('fs');

const port = 5000;

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    // ✅ Proper URL parsing (important upgrade)
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = myUrl.pathname;
    const query = Object.fromEntries(myUrl.searchParams);

    // ✅ Extract useful info
    const userAgent = req.headers['user-agent'];
    const ip = req.socket.remoteAddress;

    const log = `${new Date().toISOString()} | ${req.method} | ${pathname} | ${userAgent} | ${ip}\n`;

    // ✅ Ensure logging finishes BEFORE routing
    fs.appendFile('logger.txt', log, (err) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error logging request');
        }

        // ✅ ROUTING STARTS HERE (after logging)

        if (pathname === '/') {
            // Read file safely
            fs.readFile('logger.txt', 'utf-8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end('Error reading file');
                }

                // ✅ Proper HTML formatting
                res.setHeader('Content-Type', 'text/html');
                res.end(`<pre>${data}</pre>`);
            });

        } else if (pathname === '/about') {
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>About Page</h1>`);

        } else if (pathname === '/logs') {
            // ✅ STREAMING with error handling
            const stream = fs.createReadStream('logger.txt');

            res.setHeader('Content-Type', 'text/plain');

            stream.on('error', (err) => {
                res.statusCode = 500;
                res.end('Error reading log file');
            });

            stream.pipe(res);

        } else if (pathname === '/api') {
            // ✅ JSON response
            res.setHeader('Content-Type', 'application/json');

            const response = {
                message: "Hello from API",
                method: req.method,
                query: query
            };

            res.end(JSON.stringify(response));

        } else {
            // ✅ Proper 404
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not Found');
        }
    });
});

server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});