const fs = require('node:fs');

function readHTML(filePath , req, res){
    fs.readFile(filePath, (err, data) =>{
        if(err) {
            res.writeHead(500);
            res.end("Error loading file");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(data);
        }
    })
}

function readCSS(cssPath, req, res) {
    fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading css file');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
}

module.exports = {
    readHTML,
    readCSS,
}