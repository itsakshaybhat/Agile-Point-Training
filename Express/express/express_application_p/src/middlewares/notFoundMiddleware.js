const ApiError = require('../utils/apiError');

const notfound = async(req, res, next)=>{
    next(new ApiError(404,`Route Not found ${req.originalUrl}`));
}

module.exports = notfound;