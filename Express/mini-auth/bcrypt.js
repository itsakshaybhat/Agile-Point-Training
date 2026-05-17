import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(password, 12);

const isMatch = await bcrypt.compare(
    password,
    user.passwordHash
)



const passwordHash = await bcrypt.hash(req.body.password, 12);
await User.create({
    email: req.body.email,
    passwordHash
})

const user = await User.findOne({ email });
if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
}

const valid = await bcrypt.compare(
    password,
    user.passwordHash
)

if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
}




//Practical Example

app.post("/register", async (req, res) => {
    const passwordHash = await bcrypt.hash(
        req.body.password,
        12
    );
    res.json({
        email: req.body.email,
        passwordHash
    })
})

