import cors from "@fastify/cors";
import type{FastifyInstance} from "fastify";
import fp from "fastify-plugin";

async function corsPlugin(app: FastifyInstance){
    app.register(cors,{
        "origin": true,
    });
}

export default fp(corsPlugin);