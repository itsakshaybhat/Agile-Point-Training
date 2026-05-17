const {getAllTaskService,createTaskService,getByIdService,changeByIdService,deleteTaskService} = require('../services/taskService');
const sendResponse = require('../utils/sendResponse');
const ApiError = require('../utils/apiError');

const getTasks = async(req,res) => {
    const tasks = await getAllTaskService();
    sendResponse(res,200 , tasks, "Tasks Fetched Successfully");
}

const createTask = async(req,res) => {
    const tasks = await createTaskService(req.body);
    sendResponse(res, 201, tasks, "Tasks Added Successfully");
}

const getById = async(req,res) => {
    const { id } = req.params;
    const task = await getByIdService(id);
    if(!task){
        throw new ApiError(404, 'Not found');
    }
    sendResponse(res, 200, task, "Task fetched successful");
}

const changeById = async(req,res) => {
    const { id } = req.params;
    const task = await changeByIdService(id, req.body);
    if(!task) {
        throw new ApiError(404, "Not found");   
    }
    sendResponse(res, 200, task, 'Task is altered');
}

const deleteTask = async(req,res) => {
    const { id } = req.params;
    const task = await deleteTaskService(id);
    if(!task){
        throw new ApiError(404, "Not found");   
    }
    sendResponse(res, 200, task, 'Task is deleted');
}


module.exports = { getTasks, createTask, getById,changeById, deleteTask };