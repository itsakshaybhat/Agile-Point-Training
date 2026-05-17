require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT ;

app.listen(PORT, ()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
})