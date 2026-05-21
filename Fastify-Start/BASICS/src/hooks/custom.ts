import Fastify from 'fastify';

const app = Fastify();

app.get('/',async(request,reply)=>{
    console.log("Inside the root route");
    return {
        success: true
    }
})

app.get('/admin',{
    preHandler: async (request, reply) =>{
        const token = request.headers.authorization;
        if(!token){
            return reply.status(401).send({
                success: false,
                error: "Unauthorized"
            });
        }
    }
}, async(request, reply) =>{
    return {
        admin: true
    }
});

app.listen({port:300});