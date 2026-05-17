const {loadHTML, loadCSS} = require('./web_page/render.js');
const {sendJson} = require('./utils/sendJson');
const {fetchAllTasks,createTask} = require('../controller/taskController.js')


const handleRequest = async(req,res) =>{
    const urlPath = req.url.split('?')[0];
    const parts = urlPath.split('/');

    const isTasksBase = urlPath === '/api/tasks';
    const istasksById = parts[1] === 'api' && parts[2] === 'tasks' && parts[3];
    if(urlPath === '/' && req.method === 'GET'){
        return await loadHTML(res);
    }
    if(urlPath === '/style.css' && req.method === 'GET'){
        return await loadCSS(res);
    }
    if(isTaskBase && req.method === 'GET'){
        return await fetchAllTasks(req,res);
    }
    if(isTakeBase && req.method === 'POST'){
        return await createTask(req,res);
    }
    if(isTakeBase && req.method === 'GET'){
        return await fetchTaskById(req,res);
    }
    if(isTakeBase && req.method === 'PUT'){
        return await editTask(req,res);
    }
    if(isTakeBase && req.method === 'DELETE'){
        return await deleteTask(req,res);
    }
    return sendJson(res, 500,{
        success: false,
        message: "Server Error"
    })
}

module.exports = {handleRequest};