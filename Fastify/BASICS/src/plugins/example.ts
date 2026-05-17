import Fastify from 'fastify';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
const app: FastifyInstance = Fastify();

async function userRoutes1(app: FastifyInstance, options: FastifyPluginOptions) {
    app.get('/users',async(request, reply)=>{
        return {users: []};
    })
}

async function authPlugin(app: FastifyInstance, options: FastifyPluginOptions){
    app.addHook('preHandler',(request, reply)=>{
        console.log('Auth check');
    })
}
app.register(userRoutes,{
    prefix: '/man'
})


async function userRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
    app.get('/user',(request, reply)=>{
        console.log(options.prefix);
        return reply.type('text/html')
        .send(`<h1>hi</h1>`);
    })
}

app.register(userRoutes);
app.register(authPlugin);

const port = 3000;
app.listen({port}).then(()=>{
    console.log(`Server started at http://localhost:${port}`)
}).catch(error=>{
    app.log.error(error);
    process.exit(1);
});


//Hierarchical plugins
// app.register(async function adminPlugin(app, options) {

//     app.register(async function analyticsPlugin(app, options) {

//     });
// });


//app
//register route
//hooks
//decorators
//other plugins

//options
// app.register(userRoutes,{
//     prefix: '/api'
// })
// that-name.prefix



// Plugin loaded
//     ↓
// Hooks added
//     ↓
// Routes added
//     ↓
// Decorators added
//     ↓
// Plugin becomes active