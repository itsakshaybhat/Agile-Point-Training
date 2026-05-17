const mongoose = require('mongoose');

url = 'mongodb://127.0.0.1:27017/akshay-app-1';

async function connectMongoDb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDb,
};