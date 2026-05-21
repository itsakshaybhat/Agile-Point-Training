import Fastify from 'fastify';

const app = Fastify();

//PreHandling
app.addHook('preHandler', (request, reply)=>{
    console.log('Before the Handler');
});


//authentication 
app.addHook('preHandler', async(request, reply)=>{
    const token = request.headers.authorization;

    if(!token){
        return reply.status(401).send({
            error: 'Unauthorized'
        })
    }
});

app.get('/',async(request,reply)=>{
    console.log("Inside the root route");
    return {
        success: true
    }
})

app.listen({port:300});