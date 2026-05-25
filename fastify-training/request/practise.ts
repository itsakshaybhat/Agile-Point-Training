import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/test/:id', async (request, reply) => {
    return {
        query: request.query,
        params: request.params,
        headers: request.headers,
        requestHeader: request.raw.headers,
        method: request.method,
        url: request.url,
        ip: request.ip,
        hostname: request.hostname,
        protocol: request.protocol,
        id: request.id,
        // raw: request.raw,
        routerPath: request.routeOptions.url,
        requestOpt: request.routeOptions,
        requestOptMeth: request.routeOptions.method,


    }
})

fastify.post('/login', async (request, reply) => {
    return {
        body: request.body,
    }
})

fastify.get('/headers', async (request, reply) => {
    return {
        headers: request.headers,
    }
})

fastify.get('/listen', async (request, reply) => {
    request.log.info('Info log');
    request.log.warn('Warning log');
    request.log.info({
        user: "akshay",
        role: "admin",
    });

    return {
        requestId: request.id,
    }
})

fastify.get('/akshay/:id', async (request, reply) => {
    console.log("\n=== request.id ===");
    console.log(request.id);

    console.log("\n=== request.server ===");
    console.log(request.server);

    console.log("\n=== request.routeOptions ===");
    console.log(request.routeOptions);

    console.log("\n=== request.raw ===");
    console.log(request.raw);

    return {
        requestId: request.id,

        route: {
            method: request.routeOptions.method,
            url: request.routeOptions.url,
            logLevel: request.routeOptions.logLevel,
            bodyLimit: request.routeOptions.bodyLimit,
        },
    }
})

fastify.get('/validate', {
    schema: {
        querystring: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        }
    }
}, async (request, reply) => {

    const validate = request.getValidationFunction('querystring');

    const result = validate({
        name: "Akshay"
    });//reusing the validated scehma

    return {
        valid: result,
        errors: validate.errors
    };
});

fastify.get("/compile", async (request) => {
    const validate = request.compileValidationSchema({
        type: "object",
        properties: {
            age: {
                type: "number",
            },
        },
    });
    const validData = validate({
        age: 22,
    })
    const invalidData = validate({
        age: "hello",
    })

    return {
        validData,
        invalidData,
        errors: validate.errors,
    };
});

fastify.get("/input", async (request) => {
    const result = request.validateInput(
        {
            username: "Akshay",
        },
        {
            type: "object",
            required: ["username"],
            properties: {
                username: {
                    type: "string",
                },
            },
        }
    )
    return {
         result,
    }
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.info("There is error");
        process.exit(1);
    }
    console.log(`\nServer started at ${address}\n`);
})