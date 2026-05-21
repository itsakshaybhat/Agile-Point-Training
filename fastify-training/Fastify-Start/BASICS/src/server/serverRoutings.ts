import Fastify from 'fastify';
const app = Fastify({logger: true});

app.get('/success',async(request, reply)=>{
    reply
        .status(200)
        .header("success-message", "application/json")
        .send({
            message: "Success"
        })
})

app.post('/users',async(request, reply)=>{
    reply
        .status(201)
        .send({
            "message": "User created"
        })
})

app.get('/error', async(request, reply)=>{
    reply
        .status(500)
        .send({
            error: "Something went wrong"
        })
})


const port = 3000;

const start = async()=> {
    try {
        const address = await app.listen({
            port
        })
        console.log(`Server Started at ${address}`);
    } catch(error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();

