const fs = require('node:fs');
const path = require('node:path');

const readHTML = (res) =>{
    try{
        const filePath = path.join(__dirname,'views','index.html');
        fs.readFile(filePath, 'utf-8', (err,data)=>{
        if(err){
            console.error(err.error);
        }
        else{
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
        })
    } catch(error) {
        console.error(error.message );
    }
}
    
const readCSS = (res) =>{
    try{
        const filePath = path.join(__dirname,'views','style.css');
        fs.readFile(filePath, 'utf-8', (err,data)=>{
            if(err){
                console.error(err.message);
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        })
    } catch(error) {
        console.error(error.message );
    }
}
    

module.exports = {
    readHTML,
    readCSS,
}
