import Fastify from 'fastify';
const fastify = Fastify();

fastify.route({
    method: 'GET',
    url: '/',
    schema:{
        queryString: {
            type: 'object',
            properties: {
                name: { type : 'string'} ,
                excitement: { type: 'integer'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string'}
                }
            }
        }
    },
    handler: async function(_,reply){
        reply.send({hello: 'world'});
    }
})

fastify.listen({port: 3000}, (err,address)=>{
    if(err) throw err;
    console.log(`Server running at ${address}`);
    // console.log(fastify);
})