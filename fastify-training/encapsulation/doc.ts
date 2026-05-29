import Fastify from 'fastify';
import fastifyPlugin from 'fastify-plugin';
const fastify = Fastify({logger: true});


fastify.decorateRequest('answer', 42);

declare module 'fastify'{
    interface FastifyRequest {
        answer? : number;
        foo? : string;
        bar? : string;
    }
}

fastify.register(async function authenticateContext(childServer){
    childServer.register(import('@fastify/bearer-auth'),{keys: ['abc123']});

    childServer.route({
        url: '/one',
        method: 'GET',
        handler (request, response) {
            
            response.send({
                answer: request.answer,
                foo: request.foo,
                bar: request.bar
            })
        }
    })
})

fastify.register(async function publicContext(childServer){
    childServer.decorateRequest('foo', 'bar');
    childServer.route({
        url: '/two',
        method: 'GET',
        handler(request, response){
            console.log("\n\n",request.foo, request.bar);
            response.send({
                answer: request.answer,
                foo: request.foo,
                bar: request.bar
            })
        }
    })
    childServer.register(fastifyPlugin(async function grandchildContext (grandChildServer){
        grandChildServer.decorateRequest('bar','akshay');

        grandChildServer.route({
            url: '/three',
            method: 'GET',
            handler( request, response) {
                console.log("\n\n",request.foo, request.bar);
                response.send({
                    answer: request.answer,
                    foo: request.foo,
                    bar: request.bar
                })
            }
        })
    }))
})

fastify.listen({port:3000});