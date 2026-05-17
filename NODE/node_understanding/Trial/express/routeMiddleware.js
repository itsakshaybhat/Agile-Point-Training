const auth = (req,res,next)=>{
    console.log("Auth checked");
    next();
}

app.get('/',auth, (req,res)=>{
    res.json({message: 'Tasks'});
})


exports.createTask = (req,res)=>{
    const data = req.body;
    if(!data.title){
        return res.status(400).json({
            message: 'Title required'
        });
    }
    res.status(201).json({
        success: true, 
        message: 'Task Created',
        data
    })
}

// res.send(string, html, object, buffer);
// res.json() => specifically converts to json. sets to headers app/jjson
//http only allows one response to the one request . 



app.use((req,res)=>{
    res.status(404).json({
        message: 'Route not found'
    })
})