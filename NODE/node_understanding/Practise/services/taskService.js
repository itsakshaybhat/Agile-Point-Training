const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'tasks.json');

async function getAllTasks(){
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch(error) {
        throw new Error('Failed to read tasks');
    }
}

async function addTask(title) {
    if(!title){
    throw new Error("Title is required");
    }
    const tasks = await getAllTasks();
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1: 1,
        title
    }
    tasks.push(newTask);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2 ));
    return newTask;
}

async function getTaskById(id){
    const tasks = await getAllTasks();
    const task = tasks.find(t => t.id === Number(id));

    if(!task){
        throw new Error('Task not found');
    }
    return task;
}

async function updateTask(id, updatedData){
    const tasks = await getAllTasks();
    const index = tasks.findIndex(t => t.id === Number(id));

    if(index === -1) {
        throw new Error('Task not found');
    }

    tasks[index] = {...tasks[index] , ...updatedData};
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return tasks[index];
}

async function deleteTask(id) {
    const tasks = await getAllTasks();
    const index = tasks.findIndex(t => t.id === Number(id));
    if(index === -1){
        throw new Error('Task not found');
    }
    const deletedUser = tasks.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return deletedUser[0];
}

module.exports = {
    getAllTasks,
    addTask,
    getTaskById,
    updateTask,
    deleteTask,
}
