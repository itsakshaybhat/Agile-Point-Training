//There are 2 types of hooks: application hooks, req/reply hooks

// fastify.addHook()

import Fastify from 'fastify';
const fastify = Fastify({logger: true});

//8 different hooks are there

fastify.addHook("onRequest", (request, reply, done)=>{
    done();
})

fastify.addHook("onRequest", async (req, reply)=>{
    await function(){}
});//request.body is always undefined here

fastify.addHook("preParsing", (request, reply, payload, done)=>{
    let newPayload;
    done(null, newPayload);
})

fastify.addHook("preParsing", async (request, reply, payload)=>{
    await function(){};
    // console.log(request, reply, payload);
    let newPayload;
    return newPayload;
}) //request.bodyo will always undefined, it is available before preValidation

//I can change the payload here before validated

fastify.addHook("preValidation", (request, reply, done)=>{
   request.body = {
    ...(request.body as Record<string, any>),
    importantKey: 'randomString'
   }
    done();
});

type BodyType = {
    name?: string;
};

fastify.addHook("preValidation", (request, reply, done) => {
    const body = request.body as BodyType;

    request.body = {
        ...body,
        importantKey: "randomString"
    };

    done();
});

let generateRandomString = ()=>{};
fastify.addHook("preValidation", async(request, reply)=>{
    const importantKey = await generateRandomString();
    request.body = {
        ...(request.body as Record<string, any>), importantKey
    }
})

fastify.addHook("preHandler",(req,reply,done)=>{
    done();
})

fastify.addHook("preSerialization",(request, reply, payload, done)=>{
    const err = null;
    const newPayload = { wrapped: payload}
    done(err, newPayload);
});

fastify.addHook("preSerialization", async (request, replyl, payload)=>{
    return {wrapped: payload};
});

fastify.addHook("onError", (request, reply, error, done)=>{
    done();
});

fastify.addHook('onError', async(request, reply,error)=>{
    //Something here
})
//custom type of error, and specific header used


fastify.addHook("onSend", (request, reply, payload:any, done)=>{
    const err = null;
    const newPayload = payload.replace('some-text', 'some-new-text');
    done(err, newPayload);
})

fastify.addHook("onSend", async(request, reply, payload:any)=>{
    const newPayload = payload.replace('akshay', 'itsakshaybhat@gmail.com');
})

fastify.addHook('onResponse', (request, reply, done) => {
  // Some code
  done()
})


fastify.addHook('onResponse', async (request, reply) => {
  // Some code
  await (async ()=>{})();
})


fastify.addHook("onTimeout", (request, reply, done)=>{
    done();
})

fastify.addHook('onTimeout', async (request, reply) => {
  // Some code
  await (async()=>{})();
})

fastify.addHook('onRequestAbort', (request, done) => {
  // Some code
  done()
})

//Application hooks

// onReady, onClose, onListen, onRoute, onRegister, preClose

fastify.addHook("onReady", function (done){
    const err:any = null;
    done(err);
}); //Before request started to come, or server start to listen the request


//Alternative for the fastify.server.on("listening", ()=>{});

fastify.addHook("onListen", function (done){
    const err : any = null;
    done(err);
})

fastify.addHook('onListen', async function () {
  // Some async code
})
//  Note: This hook will not run when the server is started using fastify.inject() or fastify.ready().


fastify.addHook("onClose", (instance, done) =>{
    done()
})

fastify.addHook("preClose", (done) =>{
    done()
})

fastify.addHook('onRoute', (routeOptions) => {
  //Some code
  routeOptions.method
  routeOptions.schema
  routeOptions.url // the complete URL of the route, it will include the prefix if any
  routeOptions.path // `url` alias
  routeOptions.routePath // the URL of the route without the prefix
  routeOptions.bodyLimit
  routeOptions.logLevel
//   routeOptions.logSerializers
  routeOptions.prefix
})




fastify.listen({port: 3000});