import Fastify from "fastify";
import {urlRoutes} from "./modules/url/url.route.ts";
import {errorHandlerPlugin} from "./plugins/error-handler.ts";
import cors from "@fastify/cors";
export const buildApp = () => {
    let app = Fastify({
        logger: true,
    });

    app.register(cors, {
        origin: true,
    });

    app.register(errorHandlerPlugin);

    app.get("/health",async(req,rep)=>{
        return {
            message: "Healthy page",
        }
    });

    app.register(urlRoutes);

    return app;
}