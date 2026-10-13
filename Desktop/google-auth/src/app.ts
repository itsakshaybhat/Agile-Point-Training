import Fastify from "fastify";
import jwtPlugin from "./plugins/jwt.ts";
import helmetPlugin from "./plugins/helmet.ts";
import corsPlugin from "./plugins/cors.ts";

import {initialOIDC} from "./config/oidc.ts";

async function buildApp(){
    let app = Fastify({logger:true});


    await initialOIDC();

    app.register(jwtPlugin);
    app.register(corsPlugin);
    app.register(helmetPlugin);



    app.get("/health", async(request, reply)=>{
        return reply.status(200).send({
            message: "I am good",
        })
    });

    return app;
}

export default buildApp;