const app = require('./app');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server Running on port http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1); 
});