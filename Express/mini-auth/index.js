const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = "my_super_secret_key_123";

const users = [
    { username: 'john', password: 'password123', role: 'employee' },
    { username: 'sarah', password: 'admin123', role: 'admin' },
];

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, SECRET_KEY, (err, decodeData) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = decodeData;
        next();
    })
}


function authorizeRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Access denied: You don't have permission" });
        }
        next();
    };
}

// A route ANY logged-in user can access
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to the dashboard, ${req.user.name}!` });
});

// A route ONLY an Admin can access
app.get('/admin-panel', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: "Welcome to the secret admin panel!" });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = {
        name: user.username,
        role: user.role
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({ "token": token });
})

app.listen(3000, () => console.log('Server Started at the port of 3000'));



