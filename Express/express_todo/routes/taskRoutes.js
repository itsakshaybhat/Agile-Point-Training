const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const {validateUpdateTask} = require('../middlewares/validateUpdateTask')
const validateTask = require('../middlewares/validateTask')
const {getAllTasks,createTask,getTaskById,updateTask,deleteTask} = require('../controllers/taskController');

router.route('/').get(asyncHandler(getAllTasks)).post(validateTask,asyncHandler(createTask));
router.route('/:id').get(asyncHandler(getTaskById)).put(validateUpdateTask, asyncHandler(updateTask)).delete(asyncHandler(deleteTask));
    

module.exports = router;