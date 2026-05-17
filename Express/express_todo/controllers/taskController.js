const {getAllTasksService,createTaskService,getTaskByIdService,updateTaskService,deleteTaskService} = require('../services/taskService');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');

const getAllTasks = async(req,res)=>{
    const tasks = await getAllTasksService();
    sendResponse(res, 200, tasks, 'Tasks fetched successfully');
}
 
const createTask = async(req,res)=> {
    const newTask = await createTaskService(req.body);
    sendResponse(res, 201, newTask, 'Tasks created successfully');
}
 
const getTaskById = async(req,res)=>{
    const { id } = req.params;
    const task = await getTaskByIdService(id);
    if(!task) {
        throw new ApiError(404, 'Task not found');
    }
    sendResponse(res, 200, task, 'Tasks fetched successfully');
}

const updateTask = async(req,res)=>{
    const { id } = req.params;
    const task = await updateTaskService(id, req.body);
    if(!task) {
        throw new ApiError(404, 'Task Not found');
    }
    sendResponse(res, 200, task, 'Task Updated successfully');
}

const deleteTask = async(req,res) => {
    const { id } = req.params;
    const task = await deleteTaskService(id);
    if(!task){
        throw new ApiError(404, 'Task not found');
    }
    res.status(204).send();
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}