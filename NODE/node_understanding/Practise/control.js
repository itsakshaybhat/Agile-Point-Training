const path = require('node:path');
const fs = require('node:fs');

const loadHTML = (res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                success: false,
                message: "Unable to read the file"
            }))
        }
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
}

const loadCSS = (res) => {
    const filePath = path.join(__dirname, 'public', 'style.css');
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                success: false,
                message: "Unable to read the file"
            }))
        }
        res.writeHead(200, {'Content-Type':'text/css'});
        res.end(data);
    })
}

const loadJS = (res) => {
    const filePath = path.join(__dirname, 'public', 'script.js');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Unable to read the file'
            }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
    });
}

// const fetchAllTasks = (res) =>{
//     try{
//         const filePath = path.join(__dirname, 'tasks.json');
//         fs.readFile(filePath, 'utf-8', (err,data)=>{
//         if(err){
//             res.writeHead(400, {'Content-Type': 'application/json'});
//             res.end(JSON.stringify({
//                 success: false,
//                 message: "Unable to read the file"
//             }))
//             return;
//         }
//         const tasks = data ? JSON.parse(data) : [];
//         res.writeHead(200, {'Content-Type':'application/json'});
//         res.end(JSON.stringify(tasks));
//     })
//     }
//     catch(error) {
//         console.error(error.message);
//     }
    
// }

// const getPostUser = (req,res) => {
//     let body = '';
//     return new Promise((resolve,reject) => {
//         try{
//             req.on('data',(chunk)=>{
//                     body += chunk.toString();
//                 })
//             req.on('end',chunk=> {
//                 resolve(body);
//             })
//         } catch(error) {
//             reject(body);
//     }
//     })
    
// }

// const handleCreateTasks = async(req,res) => {
//     const data = await getPostUser(req,res);
//     let bodyData;
//     try{
//         bodyData = JSON.parse(data);
//     } catch(error) {
//         console.error(error.message);
//         return;
//     }
//     if(!bodyData) {
//         res.writeHead(400, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({
//             success: false,
//             message: "Unable to read the file"
//         }))
//         return;
//     }
//     let body = '';
//     req.on('data',chunk =>{
//         body += chunk.toString();
//     })
//     req.on('end', () => {
//         const filePath = path.join(__dirname, 'tasks.json');
//         fs.readFile(filePath, 'utf-8', (err,data)=>{
//             if(err){
//                 res.writeHead(500, {'Content-Type': 'application/json'});
//                 res.end(JSON.stringify({
//                     success: false,
//                     message: "Unable to read the file"
//             }))
//             return;
//             }
//             const newTasks = {
//                 id: tasks.length > 0 ? tasks[tasks.length -1 ].id + 1 : 1,
//                 title: bodyData.title
//             }
//             fs.writeFile(filePath, newTasks, (err) => {
//                 if(err){
//                     res.writeHead(500, {'Content-Type': 'application/json'});
//                     res.end(JSON.stringify({
//                         success: false,
//                         message: "Unable to read the file"
//                 }))
//                 }
//                 res.writeHead(201, {'Content-Type': 'application/json'});
//                 res.end(JSON.stringify({
//                         success: true,
//                         message: "Successfully inserted",
//                         data: newTasks
//                 }))
//             })


//     })
//     })
// }

// const handleFetchUser = (req,res) => {
//     try{
//         const id = req.url.split('/')[3];
//         if(!id){
//             res.writeHead(200, {'Content-Type': 'application/json'});
//             res.end(JSON.stringify({
//                 success: false,
//                 message: "Incorrect Id"
//             }))
//         }
//         const filePath = path.join(__dirname, 'public', 'tasks.json');
//         fs.readFile(filePath, 'utf-8', (err,data)=>{
//             if(err){
//                 res.writeHead(200, {'Content-Type': 'application/json'});
//                 res.end(JSON.stringify({
//                 success: false,
//                 message: "IUnable to read the file"
//             }))
//             }
//             const existingTask = data.find(task => task.id === id);
//             if(!existingTask){
//                 res.writeHead(200, {'Content-Type': 'application/json'});
//                 res.end(JSON.stringify({
//                     success: false,
//                     message: "Unable to find the user"
//             }))
//             }
//             res.writeHead(200, {'Content-Type':'application/json'});
//             res.end(JSON.stringify({
//                 success: true,
//                 message: "Task fetch successful",
//                 data: existingTask
//             }))
//         })
        
//     } catch(error) {
//         console.error(error.message);
//         res.writeHead(500, {error: "Check the handle user function"});
//         res.end(JSON.stringify({
//             success: false,
//             message: "Server Error"
//         }))
//     }
// }

// const handleEditUser = (req,res) => {
//     try{
//         const id = req.url.split('/')[0];
//         if(isNaN(id)){
//             res.writeHead();
//             res.end(JSON.stringify({

//             }))
//         }


//         const filePath = path.join(__dirname, 'public', 'tasks.json');
//         fs.readFile(filePath, 'utf-8', (err,data)=>{
//             if(err){
//                 res.writeHead(200, {'Content-Type': 'application/json'});
//                 res.end(JSON.stringify({
//                 success: false,
//                 message: "IUnable to read the file"
//             }))
//             }
//             let task = data.find(task => task.id === id);
//             if(!task){
//                 res.writeHead(200, {'Content-Type': 'application/json'});
//                 res.end(JSON.stringify({
//                     success: false,
//                     message: "Unable to find the user"
//             }))
//             }
//             data = task.length > 0 ? JSON.parse(task) : [];
//             task.title = data.title

            
//             res.writeHead();
//             res.end(JSON.stringify({
//                 success: true,
//                 message: "Updated",
//                 data:task
//             }))
    
//         })
//     }catch(error){
//         console.error(error.message);
//         res.writeHead(500, {error: "Check the handle user function"});
//         res.end(JSON.stringify({
//             success: false,
//             message: "Server Error"
//         }))
//     }
// }


// const handleDeleteUser = (req,res)=> {
//     const id = req.url.split('/')[0];
//     if(!id){
//         res.writeHead(400, {'Content-Type':'application/json'});
//         res.end(JSON.stringify({
//             success: false,
//             message: "Invalid id"
//         }))
//     }
//     const filePath = path.join(__dirname, 'public', 'tasks.json');
//         fs.readFile(filePath, 'utf-8', (err,data)=>{
//             if(err){
//                 res.writeHead(200, {'Content-Type': 'application/json'});
//                 res.end(JSON.stringify({
//                 success: false,
//                 message: "IUnable to read the file"
//             }))
//             }
//             const task = data.length > 0 ? JSON.parse(task) : [];
//             const taskIndex = data.findIndex(task => task.id === id);
//             if(taskIndex === -1){
//                 res.writeHead(404, {'Content-Type':'application/json'});
//                 res.end(JSON.stringify({
//                     success: false,
//                     message: "Not found"
//             }))
//             }
//             const deletedTask = task.splice(taskIndex,1)[0];
//             res.writeHead(200,{'Content-Type':'application/json'});
//             res.end(JSON.stringify({
//                 success: true,
//                 message: "Successfully Deleted",
//                 data: deletedTask
//             }))
//         })
// }



module.exports = {
    loadHTML,
    loadCSS,
    loadJS,
    // fetchAllTasks,
    // handleCreateTasks,
    // handleFetchUser,
    // handleEditUser,
    // handleDeleteUser,
}