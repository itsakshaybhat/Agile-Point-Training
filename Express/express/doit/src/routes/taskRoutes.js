const express = require('express');
const router = express.Router();
const {getAllTasks,createTask,getById,changeTask,deleteTask} = require('../controller/taskController');
const validate = require('../middleware/validateUpdate');
const asyncHandler = require('../utils/asyncHandler');
router.route('/').get(asyncHandler(getAllTasks)).post(asyncHandler(createTask));
router.route('/:id').get(asyncHandler(getById)).put(validate,asyncHandler(changeTask)).delete(asyncHandler(deleteTask));

module.exports = router;