const path = require('node:path');

let users = {
    list: [
        {id: 1, name: "Akshay"},
        {id: 2, name: "Pankaj"},
        {id: 3, name: "Manish"},
        {id: 4, name: "Vishwas"}
    ]
};

async function handleHomePageServer(req,res){
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
}

async function handleAllUsers(req,res){
    res.status(200).json({
        success: true,
        message: "All users retrieved",
        data: users.list
    });
}

async function handleUsersById(req,res){
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json({
                success: false,
                message: "you are entering the wrong id",
                data: req.params.id
            })
        }
        const user = users.list.find(u=> u.id === id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Id not found in the history",
                data: req.params.id
            })
        }
        res.status(200).json({
            success: true,
            message: `The user found at ${id}`,
            data: user
        })
    }catch(e) {
        console.error(e),
        res.status(500).json({
            success: false,
            message: "Server error"
    })
}
}

async function handleCreateUser(req,res){
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success: false,
                message: "Name is required"
            })
        }
        const existingUser = users.list.find(u=>u.name === name);
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User Already exist",
                data: existingUser
            })
        }
        const newUser = {
            id: users.list.length > 0 ? users.list[users.list.length -1].id + 1 : 1,
            name
        };
        users.list.push(newUser);
        res.status(201).json({
            success: true,
            message: "User successfully created",
            data: newUser
        });
    }catch(e) {
    console.error(e),
    res.status(500).json({
        success: false,
        message: "Server error"
    })
}}


async function handleUsersUpdate(req,res){
    try{
        const id = parseInt(req.params.id);
        // const name = req.params.name; //Here it should be used for the url data
        const {name} = req.body;
        if(isNaN(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Id",
                data: req.body.id
            })
        }

        if(!name){
            return res.status(400).json({
                success: false,
                message: "Enter the valid name",
                data: req.body.name
            })
        }
        const user = users.list.find(u=>u.id === id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: req.body.name
            })
        }
        user.name = name;
        res.status(200).json({
            success: true,
            message: "The request processed successfully",
            data: user
        });
    }catch(e) {
        console.error(e),
        res.status(500).json({
            success: false,
            message: "Server error"
    })
}
}

async function handleDeleteUser(req,res){
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Id",
                data: req.body.id
            })
        }
        const userIndex = users.list.findIndex(u=> u.id === id);
        if(userIndex === -1){
            return res.status(404).json({
                success: false,
                message: "User Not found",
                data: req.body.id
            })
        }
        const deletedUser = users.list.splice(userIndex,1);
        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            data: deletedUser[0]
        })
    }catch(e) {
    console.error(e),
    res.status(500).json({
        success: false,
        message: "Server error"
    })
}}


module.exports = {
    handleHomePageServer,
    handleAllUsers,
    handleUsersById,
    handleCreateUser,
    handleUsersUpdate,
    handleDeleteUser,
}