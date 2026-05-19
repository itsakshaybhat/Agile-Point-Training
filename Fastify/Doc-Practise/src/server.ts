import Fastify from 'fastify';
const fastify = Fastify({logger: true});

fastify.get('/foo',function (req, res){
    req.log.info({req},'Request Received');
    res.send('Agile Point');
})

fastify.listen({port:3000});