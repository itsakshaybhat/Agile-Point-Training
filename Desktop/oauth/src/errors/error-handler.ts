import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import {AppError} from "./AppError.ts";

export function registerErrorHandler(app: FastifyInstance){
    app.setErrorHandler((error:any, request:FastifyRequest, reply:FastifyReply)=>{
        if(error instanceof AppError){
            return reply.status(error.statusCode).send({
                success: false,
                message:error.message,
            })
        } else {
            return reply.status(500).send({
                success: false,
                message: "Internal Server Error",
            })
        }
    })
}