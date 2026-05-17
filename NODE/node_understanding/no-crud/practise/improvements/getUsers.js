if(path === '/api/users' && method === 'GET'){
    try{
        const data = users;
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify({success: true, data}));
    } catch(error){
        console.error("Error fetching users", error);
        res.writeHead(500, {'Content-Type':'applicaiton/json'});
        res.end(JSON.stringify({success: false, error: "Failed to fetch users"}));
    }
}

const fetchUsers = async()=>{
    try{
        const result = await database.query("SELECT * FROM USERS");
        return result.rows;
    } catch(err){
        throw new Error("Database fetch failed");
    }
}