const { registerUser, loginUser } = require('../services/auth.service');

const register = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await registerUser({
            email,
            password,
        });
        res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}


const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const result = await loginUser({email, password});
        res.status(200).json({
            message: "Login Successful",
            ...result,
        });
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

const getMe = (req, res) => {
    res.status(200).json({
        user: req.user,
    });
}

module.exports = {
    register,
    login,
    getMe,
};