const {readHTML,readCSS} = require('./control');

const handleRequest = (req,res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if(url.pathname === '/' && req.method === 'GET'){
        readHTML(res);
    }else if(url.pathname === '/style.css' && req.method === 'GET'){
        readCSS(res);
    }
}

module.exports = {
    handleRequest,
}