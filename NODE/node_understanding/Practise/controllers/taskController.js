const url = require('node:url');
const {getAllTasks,getTaskById,addTask, updateTask, deleteTask} = require('../services/taskService');
const {sendJson} = require('../utils/sendJson');


async function fetchAllTasks(req, res) {
    try {
        const tasks = await getAllTasks();
        sendJson(res, 200, {
            success: true,
            data: tasks
        });
    } catch (error) {
        sendJson(res, 500, {
            success: false,
            message: error.message
        });
    }
}

function getTaskId(req) {
    const parsedUrl = url.parse(req.url, true);
    const parts = parsedUrl.pathname.split('/');
    return parts[3];
}

async function fetchTaskById(req,res){
    try{
        const id = getTaskId(req);
        const taskId = await getTaskById(id);
        sendJson(res, 200, {
            success: true,
            data: taskId
        })
    } catch(error){
        sendJson(res, 404, {
            success: false,
            message: error.message  
        })
    }
}

async function createTask(req, res) {
    try{
        let body = '';
        req.on('data', chunk => {
            body +=chunk.toString();
        });
        req.on('end',async()=>{
            try {
                const {title} = JSON.parse(body);
                const task = await addTask(title);
                sendJson(res, 201, {
                    success: true,
                    data: task
                });
            } catch (error) {
                sendJson(res, 400, {
                    success: false,
                    message: error.message
                });
            }
        });
        req.on('error', () => {
            sendJson(res, 400, {
                success: false,
                message: 'Failed to read request body'
            });
        });
    } catch(error){
        sendJson(res, 500, {
            success: false,
            message: error.message
        });
    }
}

async function editTask(req,res){
    try{
        const id = getTaskId(req);
        let body = '';
        req.on('data',chunk=>{
            body += chunk.toString();
        });
        req.on('end', async() => {
            try {
                const updatedTask = JSON.parse(body);
                const task = await updateTask(id, updatedTask);
                sendJson(res,200, {
                    success: true,
                    data: task
                });
            } catch (error) {
                const statusCode = error.message === 'Task not found' ? 404 : 400;
                sendJson(res,statusCode,{
                    success: false,
                    message: error.message
                });
            }
        });
        req.on('error', () => {
            sendJson(res, 400, {
                success: false,
                message: 'Failed to read request body'
            });
        });
    } catch(error) {
        sendJson(res,500,{
            success: false,
            message: error.message
        });
    }
}

async function removeTask(req,res){
    try{
        const id = getTaskId(req);
        const task = await deleteTask(id);
        sendJson(res, 200,{
            success: true,
            data: task
        });
    } catch (error) {
        sendJson(res, 500,{
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    fetchAllTasks,
    createTask,
    getTaskId,
    fetchTaskById,
    editTask,
    removeTask,


}




