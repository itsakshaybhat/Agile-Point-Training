const path = require('node:path');
const fs = require('node:fs');
const {readHTML,readCSS} = require('./control');
const handleRequest = (req,res) => {
    if(req.url === '/' && req.method === 'GET'){
        const filePath = path.join(__dirname, 'public','index.html');
        readHTML(filePath,res);
        return;
    }
    if(req.url === '/style.css' && req.method === 'GET'){
        const filePath = path.join(__dirname, 'public', 'style.css');
        readCSS(filePath, res);
        return;
    }
    if(req.url === '/script.js' && req.method === 'GET'){
        const filePath = path.join(__dirname, 'public', 'script.js');
        fs.readFile(filePath, 'utf-8', (err,data)=>{
            if(err){
                res.writeHead(500);
                res.end("JS Error");
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);
        })
        return;
    }
    if(req.url === '/api/tasks' && req.method === 'GET'){
            const filePath = path.join(__dirname, 'tasks.json');
            fs.readFile(filePath, 'utf-8',(err,data)=>{
                if(err){
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        success: false,
                        error: err.message,
                    }));
                    return ;
                }
                const tasks = data ? JSON.parse(data) : [];
                res.writeHead(200, {'Content-Type':'application/json'});
                res.end(JSON.stringify({
                    success: true,
                    data: tasks
                }))
            })
            return;
    }
    if(req.url === '/api/tasks' && req.method === 'POST'){
        try{
            let body = '';
            req.on('data', chunk =>{
                body += chunk.toString();
                });
            req.on('end',()=>{
                const parsedData = JSON.parse(body);
                const filePath = path.join(__dirname,'tasks.json');
                fs.readFile(filePath,'utf-8',(err,data)=>{
                    const tasks = data ? JSON.parse(data) : [];
                    const newTask = {
                        id: Date.now(),
                        title: parsedData.title
                    };
                    tasks.push(newTask);
                    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err)=>{
                        if(err){
                            res.writeHead(500);
                            res.end("Error saving task");
                            return;
                        }
                        res.writeHead(201, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            success:true,
                            tasks
                        }))
                    })
                })         
            })
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: "Invalid JSON"
        }))};
    return;
    }
    if(req.method === 'DELETE' && req.url.startsWith('/api/tasks/')){
        const id = parseInt(req.url.split('/')[3]);
        if(!id){
            res.writeHead(400);
            res.end("Error reading file");
            return;
        }
        const filePath = path.join(__dirname, 'tasks.json');
        fs.readFile(filePath, 'utf-8', (err, data)=>{
            if(err){
                res.writeHead(500);
                res.end("Error reading file");
                return;
            }
            const tasks = data ? JONS.parse(data) : [];
            const filteredTasks = tasks.filter(task => task.id !== id);

            fs.writeFile(filePath, JSON.stringify(filteredTasks, null, 2), (err) => {
                if(err){
                    res.writeHead(500);
                    res.end("Error reading file");
                    return;
                }
                res.writeHead(200, {'Content-Type': 'application/javscript'});
                res.end(JSON.stringify({
                    success: true
            }));
            return;
        });
        });
    }
    if(req.url === '/api/users' && req.method === 'PUT'){
        try{
            const id = parseInt(req.url.split('/')[3]);
            let body = '' ;
            req.on('data', chunk => {
                body += chunk.toString();
            })
            req.on('end', ()=>{
                const parsedData = JSON.parse(body);
                const filePath = path.join(__dirname, 'tasks.json');
                fs.readFile(filePath, 'utf-8', (err, data) =>{
                    if(err){
                        res.writeHead(500);
                        res.end("Error Reading file");
                        return ;
                    }
                    const task = tasks.find(task => task.id === id);
                    if(!task){
                        res.writeHead(404);
                        res.end("Task not found");
                        return;
                    }
                    task.title = parsedData.title || task.title;
                    fs.writeFile(filePath, JSON.stringify(tasks, null, 2) , (err) =>{
                        if(err){
                            res.writeHead(500);
                            res.end("Error Saving file");
                            return;
                        }
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            success: true,
                            data: task
                        }))
                    })
                })
            })

        } catch(error) {
            console.error(error.message);
        }
    }
    res.writeHead(404);
    res.end("Route Not Found");
    
}

module.exports = {handleRequest};