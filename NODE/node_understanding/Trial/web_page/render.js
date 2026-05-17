const path = require('node:path');
const fs = require('node:fs/promises');
const {sendJson} = require('../utils/sendJson.js');

const loadHTML = async(res) => {
    const filePath = path.join(__dirname, '..', 'views', 'index.html');
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    } catch (err) {
        return sendJson(res, 400, {
            success: false,
            message: err.message
        });
    }
}


const loadCSS = async(res) => {
    const filePath = path.join(__dirname, '..', 'views', 'style.css');
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        res.writeHead(200, {'Content-Type':'text/css'});
        res.end(data);
    } catch (err) {
        return sendJson(res, 400, {
            success: false,
            message: err.message
        });
    }
}


module.exports = {loadHTML,loadCSS};