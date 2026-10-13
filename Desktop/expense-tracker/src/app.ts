import Fastify from "fastify";
import dbPlugin from "./plugins/db.ts";
import {errorHandler} from "./plugins/error-handler.ts";
import { notFoundHandler } from "./errors/notFound.ts";
import {expenseRoute} from "./module/expenses/exp.routes.ts";
export async function buildApp() {
    let app = Fastify({ logger: true });

    app.register(dbPlugin);

    app.register(expenseRoute,{
        prefix: "/api/exp/"
    });

    app.get("/health", async (request, reply) => {
        return reply.status(200).send({
            success: true,
            message: "Successfully Server Running",
        });
    });
    app.register(errorHandler);
    app.setNotFoundHandler(notFoundHandler);

    return app;
}