const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN;

if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn:'15m',
    })
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
};


module.exports = {
    generateAccessToken,
    verifyAccessToken
}


