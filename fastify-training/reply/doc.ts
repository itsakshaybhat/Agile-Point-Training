import Fastify from 'fastify';
import fs from 'node:fs';
const fastify = Fastify();

fastify.get('/', function(request, reply){
    const milliseconds = reply.elapsedTime;
    reply
        .code(200)
        .header('Content-Type','application/json; charset=utf-8')
        .header('set-cookie', 'goo')
        .send({ hello: 'world', milliseconds })
});


fastify.get('/trailer', async (req, reply)=>{
    reply.trailer('server-timing', function() {
    return 'db;dur=53, app;dur=47.2'
    })
    reply.removeTrailer('server-timing')
    // send a 404 response instead of passing a number to redirect
    reply.code(404);
});


    // reply
    //   .serializeInput({ foo: 'bar'}, {
    //     type: 'object',
    //     properties: {
    //       foo: {
    //         type: 'string'
    //       }
    //     }
    //   }) // '{"foo":"bar"}'

    // // or

    // reply
    //   .serializeInput({ foo: 'bar'}, {
    //     type: 'object',
    //     properties: {
    //       foo: {
    //         type: 'string'
    //       }
    //     }
    //   }, 200) // '{"foo":"bar"}'

    // // or

    // reply
    //   .serializeInput({ foo: 'bar'}, 200) // '{"foo":"bar"}'

    // // or

    // reply
    //   .serializeInput({ name: 'Jone', age: 18 }, '200', 'application/vnd.v1+json') // '{"name": "Jone", "age": 18}'
// fastify.get('/serial',async (req, reply)=>{
//     const serialize = reply
//                   .getSerializationFunction({
//                     type: 'object',
//                         properties: {
//                         foo: {
//                             type: 'string'
//                         }
//                         }
//                     })
//     serialize({ foo: 'bar' }) // '{"foo":"bar"}'

//     // or

//     const serialize = reply
//                     .getSerializationFunction(200)
//     serialize({ foo: 'bar' }) // '{"foo":"bar"}'

//     // or

//     const serialize = reply
//                     .getSerializationFunction(200, 'application/json')
//     serialize({ foo: 'bar' }) // '{"foo":"bar"}'
// })


fastify.get('/compileSerial',async(req, reply)=>{
    const serialize = reply
                  .compileSerializationSchema({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  })
    serialize({ foo: 'bar' }) // '{"foo":"bar"}'

    // // or

    // const serialize = reply
    //                   .compileSerializationSchema({
    //                     type: 'object',
    //                     properties: {
    //                       foo: {
    //                         type: 'string'
    //                       }
    //                     }
    //                   }, 200)
    // serialize({ foo: 'bar' }) // '{"foo":"bar"}'

    // // or

    // const serialize = reply
    //                   .compileSerializationSchema({
    //                         '3xx': {
    //                           content: {
    //                             'application/json': {
    //                               schema: {
    //                                 name: { type: 'string' },
    //                                 phone: { type: 'number' }
    //                               }
    //                             }
    //                           }
    //                         }
    //                   }, '3xx', 'application/json')
    // serialize({ name: 'Jone', phone: 201090909090 }) // '{"name":"Jone", "phone":201090909090}'
})


fastify.decorate('util',function util(){
    return 'foo';
})

fastify.get('/trail',async function (req, rep){
    return (fastify as any).util();
})

fastify.get('/hijack', async(req, reply)=>{
    reply.hijack();
    reply.raw.end('hello world');
    // reply.send() //serialize the object with fast-json-stringifyn
    return Promise.resolve('this will be skipped');
})

fastify.get('/streams', async(req, reply)=>{
    const stream = fs.createReadStream('some-file','utf8')
    reply.header('Content-Type','application/octet-stream')
    return reply.send(stream); //for async we need to use the return or await
})

fastify.get('/error', {
  schema: {
    response: {
      501: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          code: { type: 'string' },
          error: { type: 'string' },
          message: { type: 'string' },
          time: { type: 'string' }
        }
      }
    }
  }
}, function (request, reply) {
  const error = new Error('This endpoint has not been implemented')
  reply.code(501).send(error)
})


fastify.setNotFoundHandler(function (request, reply) {
  reply
    .code(404)
    .type('text/plain')
    .send('a custom not found')
})



fastify.listen({port: 3000}, (err,address)=>{
    if(err){
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server started at ${address}`);
})