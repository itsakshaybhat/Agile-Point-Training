const path = require('node:path');
const { readHTML, readCSS } = require('./crud.js');


function requestHandler(req, res) {
    if(req.method === 'GET' && req.url === '/'){
        const filePath = path.join(__dirname, 'views', 'index.html');
        readHTML(filePath, req, res); 
    }  else if (req.method === 'GET' && req.url === '/about') {
        const filePath = path.join(__dirname, 'views', 'about.html');
        readHTML(filePath, req, res);
    } else if (req.method === 'GET' && req.url === '/styles/style.css') {
        const cssPath = path.join(__dirname, 'styles', 'style.css');
        readCSS(cssPath, req, res);
    } else if (req.method === 'GET' && req.url === '/styles/index.css') {
        const cssPath = path.join(__dirname, 'styles', 'about.css');
        readCSS(cssPath, req, res);
    }else {
        res.writeHead(404);
        res.end('Not found error');
    }
}

module.exports = {
    requestHandler,
}