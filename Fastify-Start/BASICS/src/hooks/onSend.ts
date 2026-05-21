import Fastify from 'fastify';

const app = Fastify();

//onSend
app.addHook('onSend', (request, reply , payload)=>{
    console.log('Before sending the response');
    console.log(payload);
    return payload; //Actual response data is payload
});


app.get('/',async(request,reply)=>{
    console.log("Inside the root route");
    return {
        success: true
    }
})

app.listen({port:300});