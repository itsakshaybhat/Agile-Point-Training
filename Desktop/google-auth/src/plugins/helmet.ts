import fp from "fastify-plugin";
import helmet from "@fastify/helmet"
import type{FastifyInstance} from "fastify";

async function helmetPlugin(app:FastifyInstance){
    app.register(helmet);
}

export default fp(helmetPlugin);