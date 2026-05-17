import Fastify from 'fastify';

const app = Fastify();

//onResponse
app.addHook('onResponse', (request, reply )=>{
    console.log('After sending the response');
    console.log('Response completed');
});


app.get('/',async(request,reply)=>{
    console.log("Inside the root route");
    return {
        success: true
    }
})

app.listen({port:300});