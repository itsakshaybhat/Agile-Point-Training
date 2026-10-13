import {FastifyInstance} from "fastify";
import {
    registerController,
    loginController,
    meController,
    refreshController,
} from "./auth.controller.ts";


export default function authRoutes(app:FastifyInstance) {
    app.post("/register", registerController);
    app.post("/login", loginController);
    app.post("/me",meController);
    app.post("/refresh",refreshController);
}
