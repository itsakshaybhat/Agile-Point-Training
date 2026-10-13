import { buildApp } from "./app.ts";
import env from "dotenv";

env.config();
const port = Number(process.env.PORT) || 3000;
const app = await buildApp();
let start = async () => {
    try {
        await app.listen({ port: port });
        console.log(`\nServer Started at http://localhost:${port}`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}
start();