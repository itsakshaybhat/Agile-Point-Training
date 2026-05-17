const logger = (req, res, next) => {
    const start = Date.now();
    const duration = Date.now() - start;
    req.on('finish',()=>{
        console.log(`${req.method} ${req.originalUrl} ${req.statusCode} ${duration}ms`);
    })
    next();
}

module.exports = logger;