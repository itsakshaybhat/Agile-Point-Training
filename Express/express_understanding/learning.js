const express = require('express');
const app = express();

app.use(express.json());

let users = {
    list: [
        {id: 1, name: "Bhargav"},
        {id: 2, name: "Sundar"},
        {id: 3, name: "Sandya"}
    ]
}

app.get('/users', (req,res)=>{
    return res.send(users.list);
})

app.get('/users/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    if(!id){
        return res.status(400).json({
            success: false,
            message: "you are entering the wrong id",
            data: id 
        })
    }
    const user = users.list.find(u=> u.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "Id not found in the history",
            data: id 
        })
    }
    res.status(200).json({
        success: true,
        message: `The user found at ${id}`,
        data: user
    })
})

app.listen(300, ()=>{
    console.log("Started at 300");
    
})