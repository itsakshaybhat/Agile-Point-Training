import Fastify from 'fastify';
const app = Fastify();

app.addHook('onRequest',async(request, reply)=>{
    console.log("Incoming Request");
})

app.addHook('preHandler', async(request, reply)=>{
    console.log("Before Handler");
});


app.get('/admin',async(request, reply)=>{
    const token = request.headers.authorization;
    if(!token){
        return reply.status(401).send({
            error: "Unauthorized"
        })
    }
    return reply.status(200).send({
        message: "Welcome Admin"
    })
})


// onreq, onres, onsend, prehandler, onvalidation