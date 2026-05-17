const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req,res,next)).catch(next);
    }
}

const getTask = asyncHandler(async(req,res)=> {
    const task = await taskService.getTaskById(req.params.id);
    if(!task){
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    res.json(task);
})

app.use((err,req,res,next)=>{
    console.log(err.message);
    res.status(500).json({});
})
