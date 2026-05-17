const express = require('express');
const path = require('node:path');
const { handleHomePageServer } = require('./controller/userController');
const userRoutes = require('./routes/userRoutes');
const port = 6914;
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname,'views')));

app.get('/', handleHomePageServer);
app.use('/users', userRoutes);

app.listen(port, ()=>{
    console.log(`Server Started at http://localhost:${port}`);
})