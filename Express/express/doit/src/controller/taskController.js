const {getAllTaskService,createTaskService,getByIdServices,changeTaskService,deleteTaskService} = require('../services/taskService');
const sendResponse = require('../utils/sendResponse');
const ApiError = require('../utils/ApiError');

const getAllTasks = async(req, res) => {
    const data = await getAllTaskService();
    sendResponse(res, 200, data, 'User fetched successfully');
}
 
const createTask = async(req, res) => {
    const data = await createTaskService(req.body);
    if(!data) {
        throw new ApiError(404, 'Not found');    
    }
    sendResponse(res,201, data, 'Task created successfully');
}

const getById = async(req,res) => {
    const { id } = req.params;
    const data = await getByIdServices(id);
    if(!data) {
        throw new ApiError(404, 'Not found');
    }
    sendResponse(res,200, data,'Task is available');
}

const changeTask = async(req,res)=> {
    const {id} = req.params;
    const data = await changeTaskService(id, req.body);
    if(!data){
        throw new ApiError(404, 'Not found');
    }
    sendResponse(res, 200, data, 'Task changed successfully');
}

const deleteTask = async(req,res) =>{
    const {id} = req.params;
    const data = await deleteTaskService(id);
    if(!data){
        throw new ApiError(404, 'Not found');
    }
    res.status(204).send();
}

module.exports = {getAllTasks,createTask,getById,changeTask,deleteTask}