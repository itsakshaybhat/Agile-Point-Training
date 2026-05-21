import Fastify from 'fastify';
const app = Fastify({logger: false});

app.addHook('onRequest',async(request, reply)=>{
    console.log('Request Received');
}) //Before to the request body arrived that is (request.body)

const port = 30001;
app.listen({port});


// logging
// IP checks
// rate limiting
// authentication start
// request tracking