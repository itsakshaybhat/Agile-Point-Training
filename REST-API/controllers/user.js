const User = require('../models/user');


async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    // res.setHeader("X-MyName", "Akshay");
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
}

async function updateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
    return res.status(200).json({msg: "Success"});
}

async function deleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({msg: "Success"});
}

async function handleCreateNewUser(req,res) {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields are requird"});
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });
    return res.status(201).json({msg: "Success", id: result._id});
}

module.exports = {
    handleGetAllUsers ,
    handleGetUserById ,
    updateUserById,
    deleteUserById,
    handleCreateNewUser
};