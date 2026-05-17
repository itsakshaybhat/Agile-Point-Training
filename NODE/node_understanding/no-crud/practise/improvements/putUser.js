const match = path.match(/^\/api\/users\/(\d+)$/);

if (method === 'PUT' && match) {
    const id = Number(match[1]);

    if (Number.isNaN(id)) {
        return sendJson(res, 400, {
            success: false,
            error: "Invalid user ID"
        });
    }

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return sendJson(res, 404, {
            success: false,
            error: "User not found"
        });
   }
   const body = await getPostData(req);
   let bodyData;
   try{
    bodyData = JSON.parse(body);
    
   } catch {
    return sendJson(res, 400, {
        success: false,
        error: "Invalid JSON"
    })
   }
   const {name, role} = bodyData;
   if(!name && !role){
    return sendJson(res, 400, {
        success: false,
        error: "One attribute mention (required)"
    })
   }
   if(name){
    users[userIndex].name = name;
   }
   if(role){
    users[userIndex].role = role;
   }

   return sendJson(res, 200, {
    success: true,
    data: users[userIndex]
   })
}