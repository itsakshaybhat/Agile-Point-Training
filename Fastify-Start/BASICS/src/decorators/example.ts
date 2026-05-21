import fastify, { FastifyInstance} from 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        sayHello: ()=> string;
    }
}

const app: FastifyInstance = fastify();

app.decorate('sayHello',function(){
    return 'Hello world';
});

app.get('/',async(request, reply)=>{
    const result = await app.sayHello();
    return {
        message: result
    }
});

app.decorate('sayHi', async function(){
    return "Hi Akshay";
})

app.decorateRequest('user', null);


app.listen({port: 3000});
