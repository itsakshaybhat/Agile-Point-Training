import Fastify, {FastifyInstance as FI , FastifyPluginOptions as FPO} from "fastify";
import fastifyPlugin from "fastify-plugin";

const fastify = Fastify({logger: true});

declare module "fastify" {
    interface FastifyInstance {
        greet(): string;
        hi(): string;
        utility(): string;
        readonly foo: string;
    }
}

async function greetDecor(instance: FI, opts: FPO){
    instance.decorate("greet", ()=>{
        return "greet message"
    })
}

async function hiDecor(instance: FI, opts: FPO){
    instance.decorate("hi", ()=>{
        return "hi message"
    })
}

async function utilityDecor(instance: FI, opts: FPO){
    instance.decorate("utility", ()=>{
        return `${instance.greet()} | ${instance.hi()}`;
    })
}

async function decorateReplyObj(instance: FI, opts: FPO){
    instance.decorateReply("gd", ()=>{
        return {ok: true};
    })
}


fastify.register(fastifyPlugin(greetDecor, {name: 'greet'}));
fastify.register(fastifyPlugin(hiDecor, {name: 'hi'}));
fastify.register(fastifyPlugin(utilityDecor, {dependencies: ['greet', 'hi']}));
fastify.register(fastifyPlugin(decorateReplyObj));

fastify.get('/',function(req, reply){
    reply.send({hello: fastify.utility(),
                ok:fastify.hi(),
    });
})


// Don't do this
// fastify.decorateReply('foo', { bar: 'fizz'})

// do this
fastify.decorateReply("foo", function () {
  return { bar: "fizz" };
});

async function akshay(instance: FI, opts: FPO){
    instance.decorateReply("foo", ()=>{
        return {foo: {bar: 'fizz'}};
    })
}

//getter and setter

fastify.decorate('foo', {
    getter(){
        return 'Iam getter'
    }
})

console.log(fastify.foo);

const utility = fastify.getDecorator('utility');
const hi = fastify.getDecorator('hi');
const bye = fastify.getDecorator('greet');



fastify.listen({port: 3000});