const fs = require('node:fs');

function readHTML(filePath, res){
    fs.readFile(filePath, 'utf-8',(err,data)=>{
        if(err){
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                success: false,
                error: err.message
            }));
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    })
    return;
}


function readCSS(filePath, res){
    fs.readFile(filePath, 'utf-8',(err,data)=> {
        if(err){
            res.writeHead(500,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                success: false,
                error: err.message,
            }))
            return;
        }
        res.writeHead(200,{'Content-Type':'text/css'});
        res.end(data);
    })
    return;
}


function readScript(filePath, res){
    fs.readFile(filePath, 'utf-8',(err,data)=> {
        if(err){
            res.writeHead(500,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                success: false,
                error: err.message,
            }))
            return;
        }
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(data);
    })
    return;
}

module.exports = {readHTML,readCSS, readScript};