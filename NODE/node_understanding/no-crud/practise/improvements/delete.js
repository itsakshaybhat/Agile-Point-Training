const match = path.match(/^\/api\/users\/([d+])$/);
if(method === 'DELETE' && match){
    const id = Number(match[1]);
    if(Number.isNaN(id)){
        return sendJson(res, 400, {
            success: false,
            error: "Invalid user ID"
        })
    }
    const userIndex = users.findIndex(u => u.id === id);
   if (userIndex === -1) {
    return sendJson(res, 404, {
        success: false,
        error: "User not found"
    });
    }
   const deletedUser = users.splice(userIndex, 1)[0];

    return sendJson(res, 200, {
    success: true,
    data: deletedUser
});
}