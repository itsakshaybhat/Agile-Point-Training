import Fastify from "fastify";
import chatRoute from "./routes/chat.route.js";

const app = Fastify({logger: true});

app.register(chatRoute);

const start = async ()=>{
    await app.listen({
        port:3000,
    });
}

start();