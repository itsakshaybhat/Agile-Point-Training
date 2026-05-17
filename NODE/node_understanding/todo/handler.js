const path = require('node:path');
const fs = require('node:fs');
const {readHTML,readCSS,readScript} = require('./control.js');
const handleRequest = (req,res) =>{
    if(req.url === '/' && req.method === 'GET'){
        const filePath = path.join(__dirname, 'public', 'index.html');
        return readHTML(filePath,res);
    }
    if(req.url === '/style.css' && req.method === 'GET'){
        const filePath = path.join(__dirname, 'public', 'style.css');
        return readCSS(filePath,res);
    }
    if(req.url === '/script.js' && req.method === 'GET'){
        const filePath = path.join(__dirname, 'public', 'script.js');
        return readScript(filePath,res);
    }





    const sendError = () => {
        res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                success: false,
                error: err.message,
        }));
        return;
    }

    const reality = (value) => {
        res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify({
                success: true,
                data: value
            }))
    }


    if(req.url === '/api/tasks' && req.method === 'GET'){
        const filePath = path.join(__dirname, 'tasks.json');
        fs.readFile(filePath, 'utf-8', (err,data) => {
            if(err) {
                return sendError();
            }
            const tasks = data ? JSON.parse(data) : [];
            return reality(tasks);
        })
    }
    if(req.url === '/api/tasks' && req.method === 'POST'){
        try{
            let body = '';
            req.on('data',chunk => {
                body += chunk.toString();
            })
            req.on('end',()=>{
                const parsedData = JSON.parse(body);
                const filePath = path.join(__dirname,'tasks.json');
                fs.readFile(filePath,'utf-8',(err,data)=>{
                    if(err){
                        return sendError();
                    }
                    const tasks = data ? JSON.parse(data) : [];
                    const newTask = {
                        id: Date.now(),
                        title: parsedData.title
                    };
                    tasks.push(newTask);
                    fs.writeFile(filePath, JSON.stringify(tasks, null, 2),(err)=>{
                        if(err){
                            return sendError();
                        }
                        return reality(tasks);
                    })
                })
            })
        } catch(error){
            return sendError();
        }
    }
    if(req.path === '/api/tasks' && req.method === 'DELETE'){
        const id = parseInt(req.url.split('/')[3]);
        if(!id){
            return sendError({error: "Id not found"});
        }
        const filePath = path.join(__dirname, 'tasks.json');
        fs.readFile(filePath, 'utf-8', (err,data)=>{
            if(err){
                return sendError();
            }
            const tasks = data ? JSON.parse(data) : [];
            const filteredData = tasks.filter(task => task.id !== id);
            fs.writeFile(filePath, JSON.stringify(filteredData, null, 2), (err)=>{
                if(err){
                    return sendError();
                }
                return reality(filteredData);
            })
        })
    }

}