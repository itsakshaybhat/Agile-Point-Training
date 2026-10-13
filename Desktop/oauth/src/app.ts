import Fastify from "fastify";
import authRoutes from "./modules/auth/auth.routes.ts";
import {registerErrorHandler} from "./errors/error-handler.ts";
import jwtToken from "./plugins/jwt.ts";

export function buildApp() {
    const app = Fastify({logger: true});

    app.register(jwtToken);

    app.get("/health", async(request, reply)=>{
        return reply.status(200).send({
            success: true,
            message: "Server Running Successfully",
        })
    });

    app.register(authRoutes, {
        prefix: "/api/auth"
    });

    app.register(registerErrorHandler);

    return app;
}

buildApp();