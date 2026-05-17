import fastify from 'fastify';
const app = fastify();

async function userRoutes(app, options){
    app.get('/',async(request, reply)=>{
        return {
            message:"User route"
        }
    });
    app.get('/profile');
}

async function adminRoutes(app, options){
    app.addHook('preHandler',async(request, reply)=>{
        console.log("Admin route accessed");
    })
    app.get('/',async(request, reply)=>{
        return {
            message:"Admin route"
        }
    });
    app.get('/settings',async(request, reply)=>{
        return {
            message:"Setting route"
        }
    });
}

app.register(userRoutes,{
    prefix: '/api/users'
})
app.register(adminRoutes,{
    prefix: '/api/admin'
})


app.listen({port:3000});