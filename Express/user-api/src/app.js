const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('API Is Running');
})

module.exports = app;


// const asyncHandler = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
// };

// module.exports = asyncHandler;