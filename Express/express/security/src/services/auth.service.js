const users = require('../data/users');
const {hashPassword, comparePassword} = require('../utils/password.util');
const { generateAccessToken} = require('../utils/token.util');

const registerUser = async({email, password}) => {
    console.log('Register called with:', {email, password});
    console.log('Current users before:', users);
    
    const existingUser = users.find((user)=> user.email === email);
    if(existingUser){
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: Date.now().toString(),
        email,
        password:hashedPassword,
        role: 'user',
    };

    users.push(newUser);
    console.log('Users after push:', users);

    return {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
    }
}

const loginUser = async ({email, password}) => {
    const user = users.find((user)=> user.email === email);
    // console.log("Email is", email);
    // console.log("password is", password);
    if(!user) {
        throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid){
        throw new Error("Invalid Credentials");
    }
    
    const accessToken = await generateAccessToken({
        id: user.id,
        role: user.role,
    });
    
    return {
        accessToken,
    };
}


module.exports = {
    registerUser,
    loginUser,
};


// fastify
