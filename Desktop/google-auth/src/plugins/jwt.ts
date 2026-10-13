import fp from "fastify-plugin";
import jwt from "@fastify/jwt"
import type { FastifyInstance } from "fastify";

async function jwtPlugin(app: FastifyInstance) {
    app.register(jwt, {
        secret: "supersecret",
    });
}

export default fp(jwtPlugin);