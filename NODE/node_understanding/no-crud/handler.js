let users = [
    { id: 1, name: "Alice", role: "Admin"},
    { id: 2, name: "Bob", role: "User"}
];

const fetchAllUsers = async() => {
    return new Promise((resolve) => {
        resolve(users);
    });
}

const getPostData = (req) =>{
    return new Promise((resolve,reject) => {
        try{
            let body = '' ;
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', ()=>{
                resolve(body);
            });
        } catch(error) {
            reject(error);
        }
    });
}

const handleRequest = async(req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const method = req.method;

    try {
        if (path === '/api/users' && method === 'GET') {
            const data = await fetchAllUsers();
            res.statusCode = 200;
            res.end(JSON.stringify(data));

        } else if (path === '/api/users' && method === 'POST') {
            const body = await getPostData(req);
            const bodyData = JSON.parse(body);

            if(!bodyData.name || !bodyData.role) {
                res.statusCode = 400;
                return res.end(JSON.stringify({error: "Name and role are required"}));
            }

            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                name: bodyData.name,
                role: bodyData.role
            };
            const existingUser = users.find(u => u.name.toLowerCase() === bodyData.name.toLowerCase());
            if(existingUser) {
                res.statusCode = 409;
                res.end(JSON.stringify({message: "User already Exists"}));
            }

            users.push(newUser);
            res.statusCode = 201;
            res.end(JSON.stringify({message: `Get route of user ID ${newUser.id} hit!`}));
            

        } else if(path.match(/\/api\/users\/([0-9]+)/) && method === 'GET'){
            const id = parseInt(path.split('/')[3]);
            const user = users.find(u => u.id === id);

            if (user) {
                res.statusCode = 200;
                res.end(JSON.stringify(user));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: "User not found" }));
            } }
            
            else if (path.match(/\/api\/users\/([0-9]+)/) && method === 'DELETE') {
            
            const id = parseInt(path.split('/')[3]);

            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex === -1) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: "User not found" }));
            }
            const deletedUser = users.splice(userIndex,1)[0];
            res.statusCode = 200;
            res.end(JSON.stringify({ message: "User deleted successfully!", user: deletedUser }));
        } else if (path.match(/\/api\/users\/([0-9]+)/) && method === 'PUT') {
            
            const id = parseInt(path.split('/')[3]);

            
            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex === -1) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: "User not found" }));
            }

            
            const body = await getPostData(req);
            const bodyData = JSON.parse(body);

            
            if (bodyData.name) {
                users[userIndex].name = bodyData.name;
            }
            if (bodyData.role) {
                users[userIndex].role = bodyData.role;
            }

       
            res.statusCode = 200; 
            res.end(JSON.stringify({ message: "User updated successfully!", user: users[userIndex] }));

        } else {
            
            res.statusCode = 404;
            res.end(JSON.stringify({error : "Route Not Found"}));
            }
    } catch(error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({error: "Internal Server Error"}));
    }
}

module.exports = {handleRequest};