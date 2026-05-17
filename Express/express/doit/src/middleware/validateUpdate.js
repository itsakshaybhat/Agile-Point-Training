const ApiError = require('../utils/ApiError');

const validate = (req,res, next) =>{
    const {title, completed} = req.parmas;
    if(title === undefined && completed === undefined){
        return next(new ApiError(400, 'Atleast title or complted on should fill'));
    }
    if(title === undefined && typeof title !== 'string'){
        return next(new ApiError(400, 'The title should be string type'));
    }
    if(completed === undefined && typeof completed !== 'boolean'){
        return next(new ApiError(400, 'The completed should be boolean type'));
    }
    next();
}

module.exports = validate;