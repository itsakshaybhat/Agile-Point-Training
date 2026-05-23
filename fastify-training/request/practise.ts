import Fastify from 'fastify';

const fastify = Fastify({logger: true});

fastify.get('/test/:id',async(request, reply)=>{
    return {
        query: request.query,
        params: request.params,
        headers: request.headers,
        method: request.method,
        url: request.url,
        ip: request.ip,
        hostname: request.hostname,
        protocol:request.protocol,
        id: request.id,
        // raw: request.raw,
        routerPath: request.routeOptions.url,
        requestOpt: request.routeOptions,
        requestOptMeth: request.routeOptions.method,


    }
})

fastify.post('/login', async(request, reply)=>{
    return {
        body: request.body,
    }
})

fastify.get('/headers', async(request, reply)=>{
    return{
        headers: request.headers,
    }
})
 
fastify.listen({port: 3000}, (err, address)=>{
    if(err){  
        fastify.log.info("There is error");
        process.exit(1);
    }
    console.log(`Server started at ${address}`);
})