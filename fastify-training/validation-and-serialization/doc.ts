import Fastify, { FastifyRequest } from 'fastify';
const fastify = Fastify({ logger: true });

fastify.get("/hello", {
    schema: {
        querystring: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
                age: {type: "string"},
            }
        }
    }
}, async (request: FastifyRequest<{ Querystring: { name: string , age: number} }>) => {
    console.log("Handler executed");

    return {
        message: `Hello ${request.query.name} Age of ${request.query.age}`,
    };
});

fastify.post("/user/:id", {
    schema: {
        params: {
            type: "object",
            required: ["id"],
            properties: {
                id: {
                    type: "number",
                }
            }
        },
        headers: {
            type: "object",
            required: ["x-role"],
            properties: {
                "x-role": {
                    type: "string",
                }
            }
        }, 
        body:{
            type: "object",
            required: ["name"],
            properties: {
                name: {type: "string"},
                age: {type: "number"},
            }
        }
    }
},async function (request){
    console.log("Handler Executed");
    return {
        params: request.params,
        headers: request.headers,
        body: request.body,
    }
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`\nServer Started at ${address}`);
})

//joi is a schema validator

// $id for the unique identifier for the schema,so by giving new identifier Ican refer that by $ref in another definations.

//Attach Validation

let schema = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: {type: "string", errorMessage: {
                type: "Bad name"
            }}
        }
    }
}
fastify.post('/', {schema, attachValidation: true}, function(req, reply){
    if(req.validationError){
        reply.code(400).send(req.validationError);
    }
    
})