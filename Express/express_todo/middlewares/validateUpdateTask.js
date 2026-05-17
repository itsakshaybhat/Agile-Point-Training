const ApiError = require('../utils/ApiError');

const validateUpdateTask = (req,res, next) => {
    const {title, completed} = req.body;

    if(title === undefined && completed === undefined){
        return next(new ApiError(400, 'At least one field (title/completed) is required'));
    }

    if(title !== undefined && typeof title !== 'string'){
        return next(new ApiError(400, 'Title must be a string'));
    }

    if(completed !== undefined && typeof completed !== 'boolean'){
        return next(new ApiError(400, 'Completed must be a boolean'));
    }
    next();
}

module.exports = {validateUpdateTask};