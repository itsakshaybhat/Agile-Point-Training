const { loadHTML, loadCSS, loadJS } = require('./control');
const { fetchAllTasks, fetchTaskById, createTask, editTask, removeTask } = require('./controllers/taskController');

const handleRequest = async (req, res) => {
    const urlPath = req.url.split('?')[0];
    const parts = urlPath.split('/');

    const isTasksBase = urlPath === '/api/tasks';
    const isTasksById = parts[1] === 'api' && parts[2] === 'tasks' && parts[3];

    if (urlPath === '/' && req.method === 'GET') {
        return await loadHTML(res);
    }

    if (urlPath === '/style.css' && req.method === 'GET') {
        return await loadCSS(res);
    }

    if (urlPath === '/script.js' && req.method === 'GET') {
        return await loadJS(res);
    }

    if (isTasksBase && req.method === 'GET') {
        return await fetchAllTasks(req, res);
    }

    if (isTasksBase && req.method === 'POST') {
        return await createTask(req, res);
    }

    if (isTasksById && req.method === 'GET') {
        return await fetchTaskById(req, res);
    }

    if (isTasksById && req.method === 'PUT') {
        return await editTask(req, res);
    }

    if (isTasksById && req.method === 'DELETE') {
        return await removeTask(req, res);
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Route not found' }));
};

module.exports = {
    handleRequest,
};