const fs = require('node:fs').promises;
const path = require('node:path');
const {v4: uuidv4} = require('uuid');

const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

const getAllTasksService = async() => {
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        if(!data || data.trim() === ''){
            return [];
        } 
        return JSON.parse(data);
    } catch(error){
        if(error.code === 'ENOENT'){
            return [];
        }
    }
}

const createTaskService = async(taskData) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const newTask = {
        id: uuidv4(),
        title: taskData.title,
        completed: taskData.completed ?? false
    };
    tasks.push(newTask);
    await fs.writeFile(filePath, JSON.stringify(tasks,null,2));
    return newTask;
}

const getTaskByIdService = async(taskId) => {
    const data = await fs.readFile(filePath,'utf-8');

    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const task = tasks.find(t => t.id === taskId);
    return task || null;
}

const updateTaskService = async(taskId, updateData) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const index = tasks.findIndex(t => t.id === taskId);
    if(index === -1){
        return null;
    }
    tasks[index] = {...tasks[index], ...updateData};
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return tasks[index];
}

const deleteTaskService = async(taskId) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const index = tasks.findIndex(t => t.id === taskId);
    if(index === -1){
        return null;
    }
    tasks.splice(index,1);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return true;
}

module.exports = {
    getAllTasksService,
    createTaskService,
    getTaskByIdService,
    updateTaskService,
    deleteTaskService
}