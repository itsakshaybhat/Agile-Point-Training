import type{FastifyInstance} from "fastify";

import {
  analyticsHandler,
  createUrlHandler,
  redirectHandler,
} from "./url.controller.js";

export async function urlRoutes(fastify: FastifyInstance){
    fastify.post("/api/v1/urls", createUrlHandler);
    fastify.get("/api/v1/urls/:shortCode", analyticsHandler);
    fastify.get("/:shortCode", redirectHandler);
}