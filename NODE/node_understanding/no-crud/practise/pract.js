let users = [
    {id: 1, name:"Akshay", role: "Engineer"},
    {id: 2, name:"Samrat", role: "ML"},
    {id: 3, name:"Mahi", role: "SkyDiver"}
];

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, {'Content-Type':'application/json'});
    res.end(JSON.stringify(data));
}

const parsedId = (path) => {
    const match = path.match(/^\/api\/users\/(\d+)$/);
    if(!match){
        return null;
    }
    return Number(match[1]);
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
    try{
        req.on('data',chunk => {
            body += chunk.toString();
        })
        req.on('end',()=>{
            resolve(body);
        })
    } catch(error){
        reject(body);
    }
})
}

const fetchAllUsers = (res) => {
    return sendJson(res, 200, users);
}

const handleCreateUsers = async(req,res) => {
    const body = await getPostData(req);
    let bodyData;
    try{
        bodyData = JSON.parse(body);
    }catch{
        return sendJson(res, 400, {message: "User not valid"});
    }
    if(!bodyData){
        return sendJson(res, 400, {message: "Invalid User Entry"});
    }
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: bodyData.name,
        role: bodyData.role,
    };
    users.push(newUser);
    return sendJson(res, 201, {message:"User Successfully Inserted"});
}

const handleFetchUser = ( res, id) => {
    const userIndex = users.findIndex(u =>u.id === id);
    if(userIndex === -1){
        return sendJson(res, 404, {message: "Not found"});
    }
    return sendJson(res, 200, {data: users[userIndex]});
}

const handleEditUser = async(req,res,id) => {
    const userIndex = users.findIndex(u => u.id === id);
    if(userIndex === -1){
        return sendJson(res, 404, {message: "User not found"});
    }
    const data = await getPostData(req);
    let bodyData;
    try{
        bodyData = JSON.parse(data);
    } catch(error){
        console.error(error.message);
        return sendJson(res, 500, {message: "Parsing issue"});
    }
    if(bodyData.name){
        users[userIndex].name = bodyData.name;
    }
    if(bodyData.role){
        users[userIndex].role = bodyData.role;
    }
    return sendJson(res, 200, {message: "User is successfully Updated"});
}

const handleDeleteUser = (res, id) =>{
    const userIndex = users.findIndex(u=> u.id === id);
    if(userIndex === -1){
        return sendJson(res, 404, {message: "Not  found"});
    }
    const deletedUser = users.splice(userIndex,1)[0];
    return sendJson(res, 200, {message: "User deleted",data:deletedUser});
}

const handleRequest = async(req,res)=>{
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const method = req.method;
    const id = parsedId(path);

    try{
        if(path ==='/api/users' && method === 'GET'){
            return await fetchAllUsers(res);
        }
        if(path === '/api/users' && method === 'POST'){
            return await handleCreateUsers(req,res);
        }
        if(id !== null && method === 'GET'){
            return await handleFetchUser(res,id);
        }
        if(id !== null && method === 'PUT'){
            return await handleEditUser(req,res,id);
        }
        if(id !== null && method === 'DELETE'){
            return await handleDeleteUser(res, id);
        }
        return sendJson(res, 400, {message: "The user entry requirements not met"});

    }catch(error){
        console.error(error.message);
        return sendJson(res, 500, {message: "Server Error"});
    }
}


module.exports = {handleRequest};