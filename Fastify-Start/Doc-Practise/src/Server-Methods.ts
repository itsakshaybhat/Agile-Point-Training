import fastify from 'fastify';

const app = fastify();

app
    .register((instance, opts, done)=>{
        console.log('Current plugin');
        done();
    })
    .after(err =>{
        console.log('After current plugin');
    })
    .register((instance, opts, done)=>{
        console.log('Next plugin');
        done();
    })
    .after(err=>{
        console.log("After next");
    })
    .ready(err=>{
        console.log('Everythin has been loaded');
    })//Runs after each plugins have been loaded.


//After the register and before the ready the after function will run.

app.listen({port: 9080, 
    listenTextResolver: (address) => { return `listening at ${address}`}
})

// fastify.listen({ port: 3000 })
//   .then((address) => console.log(`server listening on ${address}`))
//   .catch(err => {
//     console.log('Error starting server:', err)
//     process.exit(1)
//   })

// fastify.listen({
//   port: 0,              // Use a random available port assigned by the OS
//   host: 'localhost',    // Bind server only to localhost (accessible from same machine)

//   exclusive: false,     // Allow shared port usage across cluster/workers if supported

//   readableAll: false,   // Do NOT allow all users to read the UNIX socket (mainly for socket files)

//   writableAll: false,   // Do NOT allow all users to write to the UNIX socket

//   ipv6Only: false       // Allow both IPv6 and IPv4 connections when using an IPv6 host
// }, (err) => {
//   // Callback runs after server starts or if an error occurs
// })

//address
// await fastify.listen({ port: 8080 })
// const addresses = fastify.addresses()
// [
//   { port: 8080, family: 'IPv6', address: '::1' },
//   { port: 8080, family: 'IPv4', address: '127.0.0.1' }
// ]


// fastify.routing(req, res) manually passes a raw Node.js request/response object into Fastify’s router.

// const fastify = require('fastify')()

// fastify.get('/hello', (req, reply) => {
//   reply.send({ msg: 'Hello' })
// })

// fastify.listen({ port: 3000 }, () => {
//   console.log('Server running')
// })

// // Manually route a request
// const req = {
//   method: 'GET',
//   url: '/hello',
//   headers: {}
// }

// const res = {
//   end: console.log
// }

// fastify.routing(req, res) // Internally matches route and sends response

//Checking if the route is already existed in that or not..
// const routeExists = fastify.hasRoute({
//   url: '/',
//   method: 'GET',
//   constraints: { version: '1.0.0' } // optional
// })

// if (routeExists === false) {
//   // add route
// }

