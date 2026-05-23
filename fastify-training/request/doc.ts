import Fastify from 'fastify';
const fastify = Fastify();


fastify.get('/', function(request, rep){
    console.log(request.body)
    console.log(request.query)
    console.log(request.params)
    console.log(request.headers)
    console.log(request.raw)
    console.log(request.server)
    console.log(request.id)
    console.log(request.ip)
    console.log(request.ips)
    console.log(request.host)
    console.log(request.hostname)
    console.log(request.port)
    console.log(request.protocol)
    console.log(request.url)
    console.log(request.routeOptions.method)
    console.log(request.routeOptions.bodyLimit)
    console.log(request.routeOptions.method)
    console.log(request.routeOptions.url)
    console.log(request.routeOptions.attachValidation)
    console.log(request.routeOptions.logLevel)
    console.log(request.routeOptions.version)
    console.log(request.routeOptions.exposeHeadRoute)
    console.log(request.routeOptions.prefixTrailingSlash)
    console.log(request.routeOptions.logLevel)
    console.log("Running");
})

fastify.post('/', function(request, reply){
    console.log(request.body);
    console.log(request.query);

    const validate = request.getValidationFunction({
    type: 'object',
    properties: {
        foo: {
            type: 'string'
        }
    }
    })

console.log(validate({foo: 'bar'}))
console.log(validate.errors)

const validate2 = request
                    .getValidationFunction('body');
console.log(validate({foo: 0.5}));
console.log(validate.errors);

//compile Validation Schema

const validate3 = request.compileValidationSchema({
    type: 'object',
    properties: {
        foo: {
            type: 'string'
        }
    }
})
console.log(validate3({foo: 'bar'}));
console.log(validate3.errors);

const validate5 = request
                  .compileValidationSchema({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  }, 200)
                  }, 'body')
// console.log(validate5({ hello: 'world' })) // false
// console.log(validate5.errors) // validation errors
// })


fastify.listen({port: 3000});
