if(path === '/api/users' && method === 'POST'){
    try{
        const body = await getPostData(req);
        let bodyData;
        try{
            bodyData = JSON.parse(body);
        } catch(error) {
            res.writeHead(400,{'Content-Type': 'app/json'});
            return res.end(JSON.stringify({
                    success: false,
                    error: "Invalid JSON format",
            })
        )};
        const {name , role} = bodyData;
        if(!name || !role) {
            res.writeHead(400, {'Content-Type':'app/json'});
            return res.end(JSON.stringify({
                    success:false,
                    error: "Name and role are required"
            }))
        }
        const existingUser = users.find(user=> user.name.toLowerCase() === name.toLowerCase());
        if(existingUser){
            res.writeHead(409, {'Content-Type':'app/json'});
            return res.end(JSON.stringify({
                success: false,
                error: "User already exists"
            }))
        }
        const newUser = {
            id: users.length ? users[user.length - 1].id + 1 : 1,
            name,
            role 
        }

        users.push(newUser);
        res.writeHead(201, {'Content-Type':'app/json'});
        res.end(JSON.stringify({
            success: true,
            data: newUser
        }))
    } catch(error){
        console.error("Error creating user:", error);
        res.writeHead(500, {'Content-Type':'app/json'});
        res.end(JSON.stringify({
            success: false,
            error: "Internal Server Error"
        }));
    }
}