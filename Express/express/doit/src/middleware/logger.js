const logger = (req, res, next) =>{
    const start = Date.now();
    req.on('finish', ()=>{
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${req.statusCode} ${duration}`);
    })
    next();
}

module.exports = logger;