const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');
const queryString = require('node:querystring');


const {
    createUser,
    updateUser,
    deleteUser,
    readData
} = require('./crud');


const server = http.createServer((req, res) => {
    (async () => {
        const parsedUrl = url.parse(req.url , true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/' && req.method === 'GET'){
            const filePath = path.join(__dirname,'views', 'index.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(filePath).pipe(res);
        }

        else if(pathname === '/about' && req.method === 'GET'){
            const filePath = path.join(__dirname,'views','about.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(filePath).pipe(res);
        }

        else if(pathname === '/profile' && req.method === 'GET'){
            const user = await readData();
            const userList = user.map(u=>
                `<li>
                    ${u.name} (${u.email}) 
                    <button onclick = "deleteUser(${u.id})">Delete</button>
                </li>`
            ).join('\n');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`<html><body><ul>${userList}</ul></body></html>`);
        }


        else if(pathname === '/create' && req.method === 'POST'){
            let body = '';
            for await (const chunk of req){
                body += chunk;
            }
            const parsedBody = JSON.parse(body);
            await createUser(parsedBody);
            res.writeHead(200);
            res.end('User Created');
        }
    })().catch(err => {
        res.writeHead(500);
        res.end('Server Error');
    })
})

server.listen(9909, ()=> console.log('Server Started at the index of 9909'));