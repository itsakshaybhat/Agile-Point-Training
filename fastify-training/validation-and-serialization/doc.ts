import Fastify from 'fastify';
// import ajvMergePatch from 'ajv-merge-patch';
import Ajv from 'ajv';
const fastify = Fastify({ logger :true
//   ajv: {
//     plugins: [ajvMergePatch//This makes the schema can use the $merge and $patch
//         ]
//   }
});

fastify.addSchema({
    $id: 'commonSchema',
    type: 'object',
    properties: {
        hello:{type: 'string'}
    }
});

fastify.post('/',{
    handler () {},
    schema: {
        body: { $ref : 'commonSchema#'},
        headers: { $ref : 'commonSchema#'},
    }
})

fastify.addSchema({ $id: 'one', my: 'hello' })
// will return only `one` schema
fastify.get('/', (request, reply) => { reply.send(fastify.getSchemas()) })

fastify.register((instance, opts, done) => {
  instance.addSchema({ $id: 'two', my: 'ciao' })
  // will return `one` and `two` schemas
  instance.get('/sub', (request, reply) => { reply.send(instance.getSchemas()) })

  instance.register((subinstance, opts, done) => {
    subinstance.addSchema({ $id: 'three', my: 'hola' })
    // will return `one`, `two` and `three`
    subinstance.get('/deep', (request, reply) => { reply.send(subinstance.getSchemas()) })
    done()
  })
  done()
})


//Validation
const schema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      age: { type: 'number' }
    }
  },

  querystring: {
    type: 'object',
    properties: {
      admin: { type: 'boolean' }
    }
  },

  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },

  headers: {
    type: 'object',
    required: ['x-api-key'],
    properties: {
      'x-api-key': { type: 'string' }
    }
  }
}

fastify.post('/user/:id', { schema }, async (request, reply) => {
  return {
    body: request.body,
    query: request.query,
    params: request.params,
    headers: request.headers
  }
})
const handler = ()=>{};

const s1 = {
    schema: {
    body:{
        content: {
            'application/json':{
                schema: {type: 'object'}
            },
            'text/plain': {
                schema: {type: 'string'}
            }
        }
    }
}
}
fastify.post('/the/url', s1,handler);

const opts = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                ids:{type: 'array', default: []}
            },
        },
    }
}

fastify.get('/opts', opts, (request, reply)=>{
    reply.send({params: request.query})
})

const schemaCompilers: Record<string, Ajv> = {
    body: new Ajv({
        removeAdditional: false, //Do NOT remove extra fields not defined in schema.
        coerceTypes:false, //Auto convert types
        allErrors: true //Give the all errors nstead of stoping at first one
    })
}
// fastify.setValidatorCompiler(req=> {
//     if(!req.httpPart){
//         throw new Error('Missing httpPart');
//     }
//     const compiler = schemaCompilers[req.httpPart];
//     if(!compiler){
//         throw new Error(`Missing compiler for ${req.httpPart}`);
//     }
//     return compiler.compile(req.schema);
// })


//changeing the schema use the ajv-mmerge-patch
// fastify.post('/', {
//   handler (req, reply) { reply.send({ ok: 1 }) },
//   schema: {
//     body: {
//       $patch: {
//         source: {
//           type: 'object',
//           properties: {
//             q: {
//               type: 'string'
//             }
//           }
//         },
//         with: [
//           {
//             op: 'add',
//             path: '/properties/q',
//             value: { type: 'number' }
//           }
//         ]
//       }
//     }
//   }
// })

// fastify.post('/foo', {
//   handler (req, reply) { reply.send({ ok: 1 }) },
//   schema: {
//     body: {
//       $merge: {
//         source: {
//           type: 'object',
//           properties: {
//             q: {
//               type: 'string'
//             }
//           }
//         },
//         with: {
//           required: ['q']
//         }
//       }
//     }
//   }
// })



fastify.listen({port:3000});