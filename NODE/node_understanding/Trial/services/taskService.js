const path = requrie('node:path');
const fs = require('node:fs');

const filePath = path.join(__dirname, '..', 'tasks.json');
const getAllTasks = async()=>{
    try{
        const data  = await fs.readFile(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch(error) {
        throw new Error("Failed to read tasks");
    }
}

const addTask = async(title) => {
    if(!title){
        throw new Error("Title is required");
    }
    const tasks = await getAllTasks();
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length -1].id + 1 : 1,
        title
    }
    tasks.push(newTask);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    return newTask
}

const fetchTask = async(id) => {
    if(!id) {
        throw new Error("Inalid id entry");
    }
    const tasks = await getAllUsers();
    const task = tasks.find(task => task.id === id );
    sendJson(res, 200, {
        success:true,
        message: "User found",
        data: task
    })
}

module.exports = {
    getAllTasks,
    addTask,
    fetchTask,
    

}