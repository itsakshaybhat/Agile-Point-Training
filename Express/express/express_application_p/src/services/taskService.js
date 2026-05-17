const fs = require('node:fs').promises;
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const ApiError = require('../utils/apiError');

const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

const getAllTaskService = async()=>{
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        if(!data && data.trim() === ''){
            return [];
        } else {
            return JSON.parse(data);
        }
    } catch(error) {
        if(error.code === 'ENOENT'){
            return [];
        }
    }
}

const createTaskService = async(taskData) => {
    let data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== '') {
        tasks = JSON.parse(data);
    }
    const newTask = {
        id: uuidv4(),
        title: taskData.title,
        completed: taskData.complted ?? false
    }
    tasks.push(newTask);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return newTask
}

const getByIdService = async(id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const task = tasks.find(t => t.id === id);
    return task || null;
}

const changeByIdService = async(id, updated) =>{
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !== ''){
        tasks = JSON.parse(data);
    }
    const index = tasks.findIndex(t=> t.id === id);
    if(index === -1){
        return null;
    }
    tasks[index] = {...tasks[index], ...updated};
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return tasks[index];
}


const deleteTaskService = async(id) => {
    const data = await fs.readFile(filePath, 'utf-8');
    let tasks = [];
    if(data && data.trim() !==''){
        tasks = JSON.parse(data);
    }
    const index = tasks.findIndex(t=> t.id === id);
    if(index === -1 ){
        return null;
    }
    tasks.splice(index,1);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return true;
}
module.exports = {getAllTaskService,createTaskService,getByIdService,changeByIdService,deleteTaskService}

