const express = require('express');
const app = express() ;

app.use(express.json());

const objectAkshay = [
    {id:1, usn:"1VK22CS005", name: "AKSHAY", work: "SOFTWARE_ENGINEER"},
    {id:2, usn:"1VK22CS011", name: "ASHLESH", work: "BACKEND ENGINEER"}
];

app.get('/:id',(req,res)=>{
    const requestId = parseInt(req.params.id);
    const foundWorkflow = objectAkshay.find(x=> x.id === requestId);
    if(foundWorkflow){
        res.json(foundWorkflow);
    } else {
        res.status(404).json({error: "Noodu eno ond error iddu"});
    }
});

app.post('/',(req,res)=>{
    const workflow = {
        id: objectAkshay.length + 1,
        name: req.body.name,
        status: req.body.status || "Pending"
    };
    objectAkshay.push(workflow);
    res.status(201).json(workflow);
});

app.listen(4000,()=>{
    console.log("The server is running Akshay please check it at the 4000");
});