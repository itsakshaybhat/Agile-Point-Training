const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'my_super_secret_key_111';

const users = [
    {username: 'Maruthi', password: 'streamify', role: 'employee'},
    {username: 'Sarny', password: 'diffusion', role: 'admin'}
];

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "NO token Provided by the client"});
    }
    jwt.verify(token, SECRET_KEY, (err, decodedKey)=>{
        if(err){
            return res.status(403).json({message: "Invalid or expired token"});
        }
        req.user = decodedKey;
        next();
    })
}

function authorizeRole(requiredRole){
    return (req,res,next)=>{
        if(req.user.role !== requiredRole){
            return res.status(403).json({message: "Access Denied"});
        }
        next();
    }
}

app.get('/dashboard', authenticateToken, (req,res)=>{
    return res.json({message: `Welcome to the dashboard, ${req.user.name}`});
})

app.get('/admin-panel', authenticateToken,authorizeRole('admin'), (req,res)=>{
    return res.json({message: `Welcome to the secret admin panel, ${req.user.name}`});
})

app.post('/register', (req, res) => {
    
    const { username, password, role } = req.body;

    
    const userExists = users.find(u => u.username === username);
    
    if (userExists) {
        return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = { 
        username: username, 
        password: password, 
        role: role || 'employee' 
    };

    users.push(newUser);

    res.status(201).json({ 
        message: "User registered successfully!", 
        user: newUser 
    });
});

app.post('/login',(req,res)=>{
    const { username , password } = req.body;
    const user = users.find(u=> u.username === username && u.password === password);
    if(!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }
    const payload = {
        name: user.username,
        role: user.role
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1hr'});
    res.json({"token": token});
})

app.listen(3000, ()=> console.log(`Server Started at 3000`));