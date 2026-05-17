const express = require('express');
const router = express.Router();
const validateTask = require('./middlewares/validateTask');
const validateUpdateTask = require('./middlewares/validateUpdateTask');
const asyncHandler = require('../utils/asyncHandler')
const {getTasks,createTask,getById,changeById,deleteTask} = require('../controllers/taskController');

router.route('/').get(asyncHandler(getTasks)).post(validateTask, asyncHandler(createTask));
router.route('/:id').get(asyncHandler(getById)).put(validateUpdateTask,asyncHandler(changeById)).delete(asyncHandler(deleteTask));

module.exports = router;