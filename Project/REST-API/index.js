const express = require('express');
const {connectMongoDb} = require('./connection');

const {logReqRes} = require("./middlewares");

const userRouter = require('./routes/user');

const app = express();
const port = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/akshay-app-1")
.then(()=> console.log('MongoDB Connected'))
.catch((err) => console.log("Mongo Error", err));


app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));

app.use('/api/user', userRouter);

app.listen(port, ()=> console.log(`Server Started at the port ${port}`));

