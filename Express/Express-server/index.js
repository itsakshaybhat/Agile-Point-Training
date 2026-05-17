const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("Hello from home page");
});

app.get('/about',(req, res) => {
    return res.send("Requested by the user: " + req.query.name);
});

app.listen(3000, ()=> console.log("NOW using the express framework"));