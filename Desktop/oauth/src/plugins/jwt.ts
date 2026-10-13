import jwt from "@fastify/jwt";
import fp from "fastify-plugin";
import type {FastifyInstance} from "fastify";
import {env} from "../config/env.ts";

async function jwtToken(app:FastifyInstance){
    return app.register(jwt, {
        secret: env.JWT_ACCESS_SECRET,
    });
};

export default fp(jwtToken);