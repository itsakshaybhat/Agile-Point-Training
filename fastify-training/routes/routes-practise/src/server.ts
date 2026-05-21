import Fastify from 'fastify';
const fastify = Fastify({logger: true});


//full declaration
fastify.route({
    method: "GET",
    url: "/about",
    handler: async (req, reply) => {
        return {
            framework: "fastify",
            type: "Full Route Declaration"
        }
    }
});

fastify.route({
    method: 'POST',
    url: '/login',
    handler: async(req, rep)=>{
        return rep.send({success: true});
    }
})

fastify.listen({port: 3000}, (err, address)=>{
    if(err){
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server started at ${address}`);
})


