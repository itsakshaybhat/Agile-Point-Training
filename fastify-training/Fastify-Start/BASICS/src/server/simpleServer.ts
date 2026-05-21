import Fastify from 'fastify';

const fastify = Fastify();

fastify.get("/", async(request, reply)=>{
    return {message: "hello"}
})

fastify.listen({port: 3000});


fastify.register(async function(instance){
    instance.decorate("test", "hello");
})

