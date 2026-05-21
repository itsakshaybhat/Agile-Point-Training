// import Fastify from 'fastify';
// const fastify = Fastify();

// // parametric
// fastify.get('/example/:userId', function (request, reply) {
//   // curl ${app-url}/example/12345
//   // userId === '12345'
//   const { userId } = request.params;
//   // your code here
// })

// fastify.get('/example/:userId/:secretToken', function (request, reply) {
//   // curl ${app-url}/example/12345/abc.zHi
// //   let userId = '12345'
// //   let secretToken = 'abc.zHi'
//   const { userId, secretToken } = request.params;
//   // your code here
// })

// // wildcard
// fastify.get('/example/*', function (request, reply) {})



// // parametric with regexp
// fastify.get('/example/:file(^\\d+).png', function (request, reply) {
//   // curl ${app-url}/example/12345.png
//   // file === '12345'
//   const { file } = request.params;
//   // your code here
// })

// fastify.get('/example/near/:lat-:lng/radius/:r', function (request, reply) {
//   // curl ${app-url}/example/near/15°N-30°E/radius/20
//   // lat === "15°N"
//   // lng === "30°E"
//   // r ==="20"
//   const { lat, lng, r } = request.params;
//   // your code here
// })

// This is using the - symbol

