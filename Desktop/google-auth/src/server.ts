import buildApp from "./app.ts";
import env from "dotenv";
env.config();

const port = Number(process.env.PORT) || 3000;
const start = async (port:number)=>{
    try{
        let app = await buildApp();

        app.listen({port:port})

        console.log("Server Running Successfully on http://localhost:3000");

    } catch(error:any){
        console.error(error.message);
        process.exit(1);
    }
}

start(port);