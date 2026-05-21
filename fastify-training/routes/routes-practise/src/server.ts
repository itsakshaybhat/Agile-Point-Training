import Fastify from 'fastify';
const fastify = Fastify({logger: {
    serializers: {
        user(value){
            return{
                username: value.name,
            }
        }
    }
}});


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

//Short hand declaration
fastify.get('/',async(req, rep)=>{
    return {
        framework: "fastify",
        type: "Full Route Declaration"
    }
});

fastify.route({
    method: 'POST',
    url: '/login',
    handler: async(req, rep)=>{
        return {success: true};
    }
})

fastify.route({
    method: 'GET',
    url: '/user',
    schema: {
        querystring: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string'},
                age: {type: 'number'},
                city: {type: 'string'},
            },
        }
    }, handler:async(req, rep)=>{
        return {
            query: req.query,
        }
    }
})

fastify.get("/users/me", async () => {
  return { user: "current user" };
});

fastify.route({
    method:'GET',
    url: '/users/:id',
    schema:{
        params: {
            type: 'object',
            properties: {
                id: { type: 'number'},
            }
        }
    },
    handler: async(req, rep)=>{
        return {
            params: req.params,
        }
    }
})

fastify.route({
    method: 'GET',
    url: '/products/:productId',
    schema:{
        params:{
            type: 'object',
            required: ['productId'],
            properties: {
                productId: { type: 'string'},
            }
        }

    }, handler: async function(req, rep){
        return req.params;
    }
})

fastify.route<{
    Params:{
        orderId: number,
        itemId: number,
    }
    }>({
    method: 'GET',
    url: '/orders/:orderId/items/:itemId',
    schema: {
        params:{
            type: 'object',
            required: ['orderId', 'itemId'],
            properties: {
                orderId: {type: 'number'},
                itemId: {type: 'number'}
            }
        }
    },handler: async(req, rep)=>{
        return {
            orderId: req.params.orderId,
            itemId: req.params.itemId,
        }
    }
})

fastify.route<{
    Params:{
        userId: number,
        postId: number,
        commentId: number,
    }
}>({
    method: 'GET',
    url: '/users/:userId/posts/:postId/comments/:commentId',
    schema:{
        params:{
        type: 'object',
        required: ['userId', 'postId', 'commentId'],
        properties: {
            userId: {type: 'number'},
            postId: {type: 'number'},
            commentId: {type: 'number'}
        }
    }
    }, handler: async(req, rep)=>{
        return {
            params: req.params,
            akshay: req.params.postId
        }
    }
})

fastify.get("/files/download", async () => {
  return {
    route: "static route",
  };
});

fastify.get("/files/:name", async (request) => {
  return {
    params: request.params,
  };
});

fastify.get('/files/*',async(rq,rs)=>{
    return{
        url: rq.url,
    }
})


fastify.get('/usrs/:id?',{
    schema:{
        params:{
            type: 'object',
            properties: {
                id: {type: 'number'},
            }
        }
    }
},async(req, rep)=>{
    return req.params
})

fastify.route({
    method: 'GET',
    url: '/hi',
    config:{ // custom metadata attached to the routing
        appName: 'Fastify Practise',
        version: '1.0.0',
        name: 'akshay',
        requiresAuth: true,
    },
    handler: async ( req, res ) => {
        return{
            config: req.routeOptions.config.requiresAuth,
        }
    }
})

//Response Schema
fastify.route({
    method: 'GET',
    url: '/person',
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    city: { type:'string'},
                }
            }
        }
    }, handler: async() => {
        return {
            name: "Akshay",
            city: "bengaluru",
        }
    }
})
//v1Routes is just an encapsulated Fastify instance for that plugin scope.
//V1Routes I mentioned here, It can be anything not only that okay?
fastify.register(async function (v1Routes){
    v1Routes.get('/mens', async()=>{
        return {
            version: 'v1',
            route: '/users',
        };
    });
    v1Routes.get('/gentlemens', async()=>{
        return {
            version: 'v1',
            route: '/gentlemens',
        };
    });
}, {
    prefix: '/v1',
});

//Adding prefix here
fastify.register(async function(akshay){
    akshay.get('/akshay',async()=>{
        return {
            version: 'v2',
            route: '/akshay'
        }
    }),
    akshay.get('/bhat',async()=>{
        return {
            version: 'v2',
            route: '/bhat'
        }
    })
},{
    prefix: '/don',
});

fastify.get('/info',{
    logLevel: 'info',
},
async ()=>{
    return {
        route: 'info',
    }
})
// trace
// debug
// info
// warn
// error
// fatal

fastify.get('/warn',{
    logLevel: 'warn',
}, async function(){
    return{
        route: 'warn',
    };
});

fastify.get('/debug',{
    logLevel: 'debug',
}, async function(){
    return{
        route: 'debug',
    };
});

fastify.get('/window',async(request)=>{
    request.log.info({
        user:{
            name: "akshay",
            age: 22,
        }
    });
    return {
        success: true,
    }
});


fastify.listen({port: 3000,host: '0.0.0.0'}, (err, address)=>{
    if(err){
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`\nServer started at ${address}\n`)
});