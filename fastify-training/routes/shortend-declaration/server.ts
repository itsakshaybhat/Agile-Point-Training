import Fastify from 'fastify';
const fastify = Fastify();

const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}

fastify.get('/', opts, (request, reply) => {
  reply.send({ hello: 'Akshay' })
})

fastify.listen({port:3000});


// const opts = {
//   schema: {
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           hello: { type: 'string' }
//         }
//       }
//     }
//   },
//   handler: function (request, reply) {
//     reply.send({ hello: 'world' })
//   }
// }
// fastify.get('/', opts)