router.post('/refresh', async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message: "Refresh token missing "});
    }
    try{
        const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN);
        const accessToken = jwt.sign({
            userId: payload.userId,
            role: payload.role
        },
    process.env.JWT_SECRET,
    {
        expiresIn: '15m'
    });
    res.json({accessToken});
    }catch{
        res.status(401).json({message: "Invalid refresh token"});
    }});

    const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "15m" }
);

const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: "7d" }
);

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
});

res.json({ accessToken });
