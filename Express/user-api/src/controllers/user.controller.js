const User = require('../models/user.model');

const createUser = async(req,res)=>{
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success:true,
            data:user,
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

const getUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getUserById = async(req,res)=>{
    try{
        const user = await User.findByIndex(req.params.id);
        if(!user){
            res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }
        res.status(200).json({
            success:true,
            data: user,
        })

    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

const updateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if(!user){
            res.status(404).json({
                success:true,
                message: 'User Not Found',
            })
        }
        res.status(201).json({
            success: true,
            data:user,
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
        })
    }
}


const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({
                success: false,
                message: 'User Not Found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted Successfully',
            data: user,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
}
