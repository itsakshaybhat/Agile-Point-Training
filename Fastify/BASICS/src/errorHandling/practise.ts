import Fastify from 'fastify';
const app = Fastify();

class UnauthorizedError extends Error{
    statusCode = 401;
    constructor(message: string){
        super(message);
    }

}

app.get('/admin',(request, reply)=>{
    const header = request.headers.authorization;
    if(!header){
        throw new UnauthorizedError("Unauthorized Access");
    }
})