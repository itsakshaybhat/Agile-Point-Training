import type{FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import {AppError} from "../errors/app-error.ts";

export async function errorHandler(app:FastifyInstance){
    app.setErrorHandler((error: any,request: FastifyRequest, reply: FastifyReply)=>{
        app.log.error(error);
        if( error instanceof AppError){
            return reply.status(error.statusCode).send({
                success: false,
                message: error.message,
            });
        }
        return reply.status(500).send({
            success: false,
            message: "Invalid Server Error",
        })
    })
}