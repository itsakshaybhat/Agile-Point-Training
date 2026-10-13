import { buildApp } from "./app.ts";
import env from "dotenv";

env.config();

let PORT = Number(process.env.PORT) | 3000 ;
let HOST = "0.0.0.0";

export const start = async() => {
    const app = buildApp();
    try {
        await app.listen({ port: PORT, host: HOST });
        console.log(`Server Started at http://localhost:${process.env.PORT}`);
    } catch (error: any) {
        console.error(error);
        process.exit(1);
    }
}

start();