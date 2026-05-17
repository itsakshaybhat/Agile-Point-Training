const ApiError = require('../utils/apiError');

const validateTask = (req, res, next) => {
    const {task , completed } = req.body;
    if(!title || typeof title !== 'string'){
        return next(new ApiError(400, 'Title is required and must be a string'));
    }
    if(!completed || typeof completed !== 'boolean'){
        return next(new ApiError(400, 'Completed must be a boolean'));
    }
    next();
}

module.exports = validateTask;