const match = path.match(/^\/api\/users\/(\d+)$/);

if (method =='GET' && match){
    const id = Number(match[1]);
    if(Number.isNaN(id)){
        res.writeHead(400, {'Content-Type':'app/json'});
        return res.end(JSON.stringify({
            success: false,
            error: "Invalid user ID"
        }))
    }
    const user = users.find(u => u.id === id);
    if(!user){
        res.writeHead(404, {'Content-Type':'app/json'});
        return res.end(JSON.stringify({
            success: false,
            error: "User not found"
        }))
    }
    res.writeHead(200, {'Content-Type':'app/json'});
    res.end(JSON.stringify({
        success:true,
        data: user 
    }))
}