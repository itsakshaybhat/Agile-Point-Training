import fastify from 'fastify';
const app = fastify();

app.decorate('sayHello', async function(){
    return 'Hello Agile Point';
})

app.('/', async(request, reply)=>{
    const result = await app.sayHello();
    return {
        message: result
    }
})

app.listen({port: 3000});