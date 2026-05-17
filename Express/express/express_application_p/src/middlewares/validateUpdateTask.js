const ApiError = require('../utils/apiError');

const validateUpdateTask = (req, res, next) => {
    const {title, completed} = req.body;
    if(title === undefined && completed === undefined){
        return next(new ApiError(400, 'title or complted atleast one field is required'));
    }
    if(title !== undefined && typeof title !== 'string'){
        return next(new ApiError(400, 'Title must be astring '));
    }
    if(completed !== undefined && typeof completed !== 'boolean'){
        return next(new ApiError(400, 'complted must be a boolean'));
    }
    next();
}

module.exports = validateUpdateTask;