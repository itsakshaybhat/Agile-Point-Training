const path = require('node:path');
const fs = require('node:fs').promises;
const {v4: uuidv4} = require('uuid');

const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

const getAllTaskService = async() => {
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        if(data && data.trim() !== ''){
            return JSON.parse(data);
        } else{
            return null;
        }
    } catch(error) {
        if(error.code !== 'ENOENT'){
            throw error;
        }
    }
}

const createTaskService = async(bodyData) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks  = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }   
    const newTask = {
        id: uuidv4(),
        title: bodyData.title,
        completed: bodyData.completed
    }
    tasks.push(newTask);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return newTask;
}

const getByIdServices = async(id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const task = tasks.find(t => t.id === id);
    return task;
}

const changeTaskService = async(id, updated) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const index = tasks.findIndex(t => t.id === id);
    if(index === -1) {
        return null;
    }
    tasks[index] = {...tasks[index], ...updated};
    await fs.writeFile(filePath, JSON.stringify(tasks, null,2));
    return tasks[index];
}

const deleteTaskService = async(id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const index = tasks.findIndex(t => t.id === id);
    if(index === -1) {
        return null;
    }
    tasks.splice(index, 1);
    fs.writeFile(filePath, JSON.stringify(tasks,null, 2));
    return tasks[index];
}

module.exports = {
    getAllTaskService,
    createTaskService,
    getByIdServices,
    changeTaskService,
    deleteTaskService,
}