const {sendJson} = require('../utils/sendJson');
const {getAllTasks, addTask} = require('../services/taskService');
const fetchAllTasks = async(req,res) => {
    try{
        const tasks = await getAllTasks();
        sendJson(res, 200, {
            success: true,
            data: tasks
        })
    } catch(error) {
        sendJson(res, 500, {
            success: false,
            message: error.message
        })
    }
}

const createTask = async(req,res) =>{
    try{
        let body = '';
        req.on('data',chunk => {
            body += chunk.toString();
        })
        req.on('end', async()=>{
            const {title} = JSON.parse(body);
            const task = await addTask(title);
            sendJson(res, 201, {
                success: true,
                data: task
            })
        })

    } catch(error) {
        sendJson(res, 500, {
            success: false,
            message: error.message
        })
    }
}

const fetchTaskById = async() => {
    try{
        const data = JSON.parse(req.body);
        const id = data.id;
        const task = await fetchTask(id);
        sendJson(res, 200, {
            success: true,
            data: task
        })
        
    } catch(error) {
        sendJson(res, 500, {
            success: false,
            error: error.message
        })
    }
}

const fetchId = (req) => {
    const body = req.url.split('/');
    const id = body[3];
    return Number(id);
}

const editTask = async(req, res) => {
    const id = await fetchId(id);
    const body  = req.url;
    const {title} = JSON.parse(body);
    if(!id){
        sendJson(res, 400, {
            success: false,
            message: "Invalid Id"
        })
    }
    const tasks = await getAllTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if(taskIndex === -1) {
        sendJson(res, 404, {
            success: false,
            message: "Not found"
        })
    }
    tasks[taskIndex] = title;
    sendJson(res,200, {
        success: true,
        data: tasks[taskIndex]
    })
}

const deleteTask = async(req,res) => {
    const id = fetchId(req);
    if(!id){
        sendJson(res, 400, {
            success: false,
            message: "Invalid Id"
        })
    }
    const tasks = await getAllTasks();
    const taskIndex = tasks.findIndex(t=> t.id === id);
    if(taskIndex === -1) {
        sendJson(res, 404, {
            success: false,
            message: "Not found"
        })
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    sendJson(res, 200, {
        success: true,
        data:deletedTask
    })
}

module.exports = {
    fetchAllTasks,

}