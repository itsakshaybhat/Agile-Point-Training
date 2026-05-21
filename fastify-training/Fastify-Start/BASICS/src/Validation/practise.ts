// import Fastify from 'fastify';

// const app = Fastify();

// app.post('/register',{
//     schema:{
//         body:{
//             type: 'object',
//             required: ['username', 'password'],
//             properties: {
//                 username: { type: 'string'},
//                 password: {type: 'string'}
//             }
            
//         },
//         params: {
//             type: 'object',
//             required: ['id'],
//             properties: {
//                 id: {type: 'number'}
//             }
//         },
//         querystring: {
//             type: 'object',
//             required: ['page'],
//             properties: {
//                 page: { type: 'number'}
//             }
//         }
//     }, async (request, reply)=>{
//         return reply.code(201);
//     }
// });

// const start = async() =>{
//     try{
//         await app.listen({port: 3000});
//     } catch(error) {
//         app.log.error(error);
//         process.exit(1);
//     }
// }

// start();